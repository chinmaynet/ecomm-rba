import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot,Router } from '@angular/router';
import { SellerService } from '../seller/seller-services/seller.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellerRoleGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) {}

 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {  
    const userString = localStorage.getItem('user');
    if (userString) {
      const currentUser = JSON.parse(userString);
      if (currentUser.role === 'seller') {
        // debugger
        return true;
      }
    }

    // If not an admin or not logged in, redirect to the authentication page
    this.router.navigate(['user-auth/auth']);
    return false;
  }
}