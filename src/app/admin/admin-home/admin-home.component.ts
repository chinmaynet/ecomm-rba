import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignUp, UserWithRoles } from 'src/app/data-type';
import { AdminService } from '../admin-services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'userEmail', 'userPhone', 'role'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService, private router: Router) { }
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
  getUsers() {
    this.adminService.usersWithRoles().subscribe((result) => {
      // console.log("users with roles data ", result);
      this.ELEMENT_DATA = result; // Use ELEMENT_DATA, not dataSource.data
      this.dataSource.data = this.ELEMENT_DATA;
      console.log(this.dataSource.data);
    });
  }
  navigateToAddSeller(){
    this.router.navigate(['admin/add-seller'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
