import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot,Router } from '@angular/router';
import { SellerService } from '../../seller/seller-services/seller.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
//applies guards to modules based on login or not  
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const userRole = this.sellerService.currentUser;
    if (this.sellerService.isSellerLogin.value) {
      return true;
    } 
    else {
      // this.router.navigate(['/seller/seller-auth']); 
      this.router.navigate(['/user-auth/auth']); 
      return false;
    }
  }

  // canActivate(route: ActivatedRouteSnapshot) {
  //   if (this.sellerService.isSellerLogin.value) {
  //     const requiredRole = route.data['requiredRole'];
  //     const userRole = this.sellerService.currentUser;

  //     if (userRole === requiredRole) {
  //       return true;
  //     } else {
  //       this.router.navigate(['user-auth/auth']);
  //       return false;
  //     }
  //   }
  //   this.router.navigate(['user-auth/auth']);
  //   return false;
  // }
}