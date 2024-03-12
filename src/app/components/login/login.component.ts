import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('login') login!: NgForm

  constructor (private http: HttpClient, private router: Router) {}

  baseUrl: string = 'http://0.0.0.0:8000/';

  onSubmit(data: any) {
    this.http.post<any>(this.baseUrl + 'api/v1/token', data).subscribe( (response) => {
      if (response.success ===  true) {
        localStorage.setItem('accessToken', response.tokens.access);
        localStorage.setItem('refreshToken', response.tokens.refresh)
        this.router.navigate(['/dashboard']);
      }
      console.log('response', response);
    }) 
    console.warn('data', data)
  }

}
