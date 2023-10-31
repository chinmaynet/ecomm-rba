import { Component,Inject  } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any //takes data from seller header components
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

