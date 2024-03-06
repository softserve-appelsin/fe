import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { RegisterComponent } from '../register/register.component';
 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private dialogRef: MatDialog) {}

  openRegistrationModal() {
    this.dialogRef.open(RegisterComponent);
  }

}
