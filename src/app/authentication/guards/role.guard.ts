import { CanActivateFn, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SellerService } from 'src/app/seller/seller-services/seller.service';

// @Injectable({
//   providedIn: 'root',
// })
// //role based authentication 
// export class RoleGuard implements CanActivate {
//   constructor(private sellerService: SellerService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const requiredRole = next.data['requiredRole'];
//     if (this.sellerService.isSellerLogin.value) {
//       return true;
//     } 
//     if (this.sellerService.hasRole(requiredRole)) {
//       // debugger;
//       return true;
//     } else {
//       this.router.navigate(['/']);
//       return false;
//     }
//   }
// }


@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = next.data['requiredRole'];

    if (this.sellerService.isSellerLogin.value && this.sellerService.hasRole(requiredRole)) {
      return true;
    } else {
      this.router.navigate(['user-auth/auth']);
      return false;
    }
  }
}
