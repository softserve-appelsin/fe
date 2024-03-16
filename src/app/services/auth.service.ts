import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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


}
