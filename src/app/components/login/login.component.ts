import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('login') login!: NgForm

  constructor (private router: Router, private authService: AuthService) {}

  onSubmit(data: any) {
    this.authService.onLogin(data);
    console.log('data from login component', data);
    this.login.reset();
    this.router.navigate(['/dashboard'])
    
  }

}
