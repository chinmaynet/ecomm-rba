import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Product, SignUp } from '../../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
//books store API . ecommerce controller
export class SellerService {
  isSellerLogin = new BehaviorSubject<boolean>(false);
  currentUser= ''
  islogInError = new EventEmitter<boolean>(false);

  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient) { }
  userSignup(data: SignUp)  : Observable<any> {
    data.id="00000000-0000-0000-0000-000000000000";
     return this.http.post('https://localhost:44376/api/E_Comm/signup', data,
      )
      // .subscribe((result:any) => {
      //   if (result) {
      //     this.isSellerLogin.next(true);
      //     this.currentUser = result.role;
      //     console.warn("signup role is ",this.currentUser);
      //     localStorage.setItem('user', JSON.stringify(result))      
      //     this.router.navigate([`${this.currentUser}/${this.currentUser}-home`]);           
      //   }
      // })
      ;
    // return false;
  }
  showLoginSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Adjust the duration as needed
    });
  }
  
  userLogin(data: Login): Observable<any> {
    // console.warn(data);
    return this.http.post(`https://localhost:44376/api/E_Comm/login`, data,{ observe: 'response' })
    // .subscribe(
    //   (result: any) => {  
    //     // console.warn("result is ", result);
    //     if (result &&  result.body.role && result.status === 200) {
    //       this.isSellerLogin.next(true);
    //       this.currentUser = result.body.role;
    //       console.log("current user is ",this.currentUser )
    //       // console.warn( "currentUser is ",this.currentUser);
    //       localStorage.setItem('user', JSON.stringify(result.body));       
    //       this.router.navigate([`${this.currentUser}/${this.currentUser}-home`]);
    //       // this.router.navigate(['/seller/seller-home']);
    //       this.showLoginSuccessSnackbar('Login successful');
    //     }
    //   },
    //   (error: any) => {            
    //       this.islogInError.emit(true);
    //   }
    // )
    ;
  }

  hasRole(requiredRole: string): boolean {
    return this.currentUser === requiredRole;
  }

  reloadSeller() {
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      const currentUser = JSON.parse(userString);
      this.isSellerLogin.next(true);
     
      const userRole = currentUser.role;
      this.currentUser=userRole;
      this.router.navigate([`${userRole}/${userRole}-home`]);
    }
  }
  
userRole = new EventEmitter<string>();
  sendRole(){
    let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  this.userRole.emit(userData.role)
  }

///////////////
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  sendRole2() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    this.userRoleSubject.next(userData?.role);
  }
}
