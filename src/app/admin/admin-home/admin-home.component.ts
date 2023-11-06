import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignUp, UserWithRoles } from 'src/app/data-type';
import { AdminService } from '../admin-services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  selectedRole: string | null = null;
  displayedColumns: string[] = ['userName', 'userEmail', 'userPhone', 'role', 'ActivityStatus'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService,private adminService: AdminService, private router: Router) { 
    this.sharedService.selectedRoleChanged.subscribe((role) => {
      this.selectedRole = role;
      console.log("role is",role)
      this.applyFilterWithoutEvent();
    });
  }
  ELEMENT_DATA: UserWithRoles[] = [];
  dataSource = new MatTableDataSource<UserWithRoles>(this.ELEMENT_DATA);
  userData: UserWithRoles | null = null;
  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  roleCounts: { [key: string]: number } = {
    admin: 0,
    seller: 0,
    user: 0,
  };
  roleData = Object.values(this.roleCounts);
  getUsers() {
    this.adminService.usersWithRoles().subscribe((result) => {
      // console.log("users with roles data ", result);
      this.ELEMENT_DATA = result;
      this.dataSource.data = this.ELEMENT_DATA;
      console.log(this.dataSource.data);
      // const roleCounts: { [key: string]: number } = {
      //   admin: 0,
      //   seller: 0,
      //   user: 0,
      // };

      if (this.dataSource.data) {
        this.dataSource.data.forEach((user) => {
          console.log("Role:", user.role);
          if (user.role === 'admin') {
            this.roleCounts['admin']++;
          } else if (user.role === 'seller') {
            this.roleCounts['seller']++;
          } else if (user.role === 'user') {
            this.roleCounts['user']++;
          }
        });
        this.roleData = Object.values(this.roleCounts);
        // const data = Object.values(this.roleCounts);
        console.log("pie roleData is ", this.roleData);
        // this.createChart(this.roleData);
      }
    });
  }
  navigateToAddSeller() {
    this.router.navigate(['admin/add-seller'])
  }
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const data = this.dataSource.data;

    if (!this.selectedRole) {
      this.dataSource.filter = filterValue;
    } else {
      this.dataSource.filter = `${this.selectedRole} ${filterValue}`;
    }
  }
  applyFilterWithoutEvent() {
    const filterValue = ''; 
    const data = this.dataSource.data;
  
    if (!this.selectedRole) {
      this.dataSource.filter = filterValue;
    } else {
      this.dataSource.filter = `${this.selectedRole} ${filterValue}`;
    }
  }
  User :UserWithRoles |null=null;
  toggleActivityStatus(user: UserWithRoles) {
    console.log('User Id being updated:', user.Id);
    console.log('User  being updated:', user);
    user.activityStatus = user.activityStatus === 'active' ? 'inactive' : 'active';
    this.User=user;
    this.adminService.updateUserActivityStatus(this.User).subscribe((result: any) => { });
  }

  togglePieChart() {
    this.router.navigate(['admin/pie-chart'], {
      queryParams: {
        roleData: JSON.stringify(this.roleData)
      }
    });
  }
}
