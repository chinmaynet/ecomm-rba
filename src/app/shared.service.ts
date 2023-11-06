
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedRoleSource = new BehaviorSubject<string | null>(null);
  selectedRoleChanged = this.selectedRoleSource.asObservable();
  constructor() { }
  changeSelectedRole(role: string) {
    this.selectedRoleSource.next(role);
  }
}
