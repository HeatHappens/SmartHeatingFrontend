import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'home', component:HomepageComponent},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'**',component:PageNotFoundComponent}
];
