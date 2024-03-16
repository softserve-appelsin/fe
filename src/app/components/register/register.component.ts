import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('createUserForm') createUserForm!: NgForm;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router  ) { }

  isArtist: boolean = false;


  onSubmit(data: any) {

    const profileType = this.isArtist ? 'Artist' : 'Listener';

    data.profile_type = profileType;

    this.http.post(this.authService.baseUrl + '/api/v1/create_user', data).subscribe((result) => {
      console.warn('result', result);
      this.createUserForm.reset();
      this.router.navigate(['/dashboard'])
    });

    console.warn(data);
    console.log(this.isArtist);
  }

}
