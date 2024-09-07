import { ChangeDetectorRef, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoggedEmployeeInfo } from '../../_services/employeeInfo.service';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatSidenavModule, MatListModule, RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {

  isEmployeeLoggedIn:boolean = false;
  employeeName!:any;

  constructor(private loggedEmpInfo:LoggedEmployeeInfo, private router:Router,private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.loggedEmpInfo.hasEmployeeLoggedIn$.subscribe({
      next:(data)=>{
        this.isEmployeeLoggedIn = data;
        if(this.isEmployeeLoggedIn){this.employeeName = localStorage.getItem('fullName')}
      }
    })
  }

  signout(){
    this.loggedEmpInfo.updateEmployeeObservable(false);
    this.employeeName = '';
    this.router.navigate(['/login']).then(()=>{
      localStorage.clear();
      window.location.reload();
    })
  }
}
