import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from 'src/app/data-type';
import { UserWithRoles } from 'src/app/data-type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  usersWithRoles() {
    return this.http.get<UserWithRoles[]>('https://localhost:44376/api/E_Comm/usersWithRoles')
  }
  addSeller(data: UserWithRoles) {
    return this.http.post<UserWithRoles>('https://localhost:44376/api/E_Comm/addSeller', data)
  }

  updateUserActivityStatus(user: UserWithRoles): any {
    const url = `https://localhost:44376/api/E_Comm/updateActivityStatus`;
    console.log("user data is", user)
    return this.http.put(url, user);
  }
}
