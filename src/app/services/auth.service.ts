import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl: string = 'http://0.0.0.0:8000/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + 'api/v1/token', { username, password }, httpOptions);
  };

  register(first_name: string, last_name: string, username: string, email: string, phone_number: string, password: string, isArtist: boolean): Observable<any> {
    const profileType = isArtist ? 'Artist' : 'Listener';
    const userParams = { first_name, last_name, username, email, phone_number, password, profile_type: profileType };
    return this.http.post(this.baseUrl + 'api/v1/create_user', userParams, httpOptions);
  };

}
