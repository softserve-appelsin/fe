import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{

  baseUrl: string = 'http://0.0.0.0:8000/';
  accessToken: string = '';
  refreshToken: string = '';
  
  constructor(private http: HttpClient) { }

  onLogin(data: any) {
    this.http.post<any>(this.baseUrl + 'api/v1/token', data).subscribe((res) => {
      console.log('response', res);
      this.accessToken = res.tokens.access;
      this.refreshToken = res.tokens.refresh
      localStorage.setItem('access', this.accessToken);
      localStorage.setItem('refresh', this.refreshToken);
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.endsWith('/token') && this.accessToken) {

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`,
          Refresh: this.refreshToken
        }
      });
      return next.handle(authReq);
    } 
      return next.handle(req);
  }

  register(first_name: string, last_name: string, username: string, email: string, phone_number: string, password: string, isArtist: boolean): Observable<any> {
    const profileType = isArtist ? 'Artist' : 'Listener';
    const userParams = { first_name, last_name, username, email, phone_number, password, profile_type: profileType };
    return this.http.post(this.baseUrl + 'api/v1/create_user', userParams, httpOptions);
  }

}
