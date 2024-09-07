import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../../_services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginFailed!:string;
  @ViewChild('loginForm',{static:false}) loginForm!:NgForm;
  @ViewChild('password',{static:false}) passwordInput!:any;

  constructor(private router:Router,private apiService:ApiService){}

  ngOnInit(){
    if(localStorage.getItem('empID')!= null){
      this.router.navigate(['/home'])
    }
  }

  login(loginData:NgForm){
    this.apiService.loginEmployee(loginData.value).subscribe({
      next:(employee)=>{
        const fullName = employee.firstName + ' ' + employee.lastName;
        localStorage.setItem('empID', employee.empID);
        localStorage.setItem('fullName', fullName);
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.loginFailed = error.message;
        setTimeout(()=>{
          if((error.message).includes('Password')){
            this.passwordInput.reset();
          }else{
            this.loginForm.reset();
          }
          this.loginFailed = '';
        },2000)
      }
    })
  }

  toSignUp(){
    this.router.navigate(['/signup'])
  }
}
