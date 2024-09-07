import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { LoggedEmployeeInfo } from '../../_services/employeeInfo.service';
import { Router } from '@angular/router';
import { TempSelectorComponent } from '../temp-selector/temp-selector.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TempSelectorComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


  constructor(private apiService:ApiService, private loggedEmpInfo:LoggedEmployeeInfo, private router:Router){}
  
  ngOnInit(){
    if(localStorage.getItem('empID') != null){
      this.loggedEmpInfo.updateEmployeeObservable(true)
    }else{
      this.router.navigate(['/login'])
    }
  }
}
