import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { OffsetContributionComponent } from './components/offset-contribution/offset-contribution.component';
import { PersonalTrackerComponent } from './personal-tracker/personal-tracker.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'home', component:HomepageComponent},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'personaltracker',component:PersonalTrackerComponent},
    {path:'offsetcontribution', component:OffsetContributionComponent},
    {path:'**',component:PageNotFoundComponent}
];
