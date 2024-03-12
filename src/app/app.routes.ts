import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'dashboard', component: MainComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
