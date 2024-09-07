import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApiService } from '../../_services/api.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatIcon],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isEmployeeLoggedIn:boolean = false;

  constructor(private router:Router, private apiService:ApiService){}

  ngOnInit(){
    if(localStorage.getItem('empID')!= null){
      this.router.navigate(['/home'])
    }
  }

  signup(signupData:NgForm){
    this.apiService.signUpEmployee(signupData.value).subscribe({
      next:()=>{
        this.toLogin();
      },
      error:(error)=>{console.log(error)}
    })
  }

  toLogin(){
    this.router.navigate(['/login'])
  }
}
