import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoggedEmployeeInfo } from '../../_services/employeeInfo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { preferredTemp } from '../../_customTypes/employeeInfo';

@Component({
  selector: 'app-temp-selector',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule],
  templateUrl: './temp-selector.component.html',
  styleUrl: './temp-selector.component.scss'
})
export class TempSelectorComponent {

  @ViewChild('preferredTempEntry',{static:true}) preferredTempEntry!:TemplateRef<any>;

  empID!:any;
  empName!:any;
  preferredTemp!:number;
  postSuccessMsg!:string;

  constructor(private apiService:ApiService, private dialogRef:MatDialog, private loggedEmpInfo:LoggedEmployeeInfo){}

  ngOnInit(){
    this.empID = localStorage.getItem('empID');
    this.empName = localStorage.getItem('fullName');
    this.hasEmployeePreferenceSaved();
    this.displayCurrentWeather('Mannheim');
    // this.displayForecastWeather('Mannheim');
  }


  savePreferredTemp(){
    const postData:preferredTemp = {
      id: this.empID,
      fullName:this.empName,
      preferredTemp:this.preferredTemp
    }
    this.apiService.employeePreferredTemp(postData).subscribe({
      next:()=>{
        this.postSuccessMsg = 'Your preference is saved!';
        setTimeout(()=>{
          this.postSuccessMsg = '';
          this.closeTempDialog()
        },1500)
      },
      error:(error)=>{console.log(error)}
    })
  }

  hasEmployeePreferenceSaved(){
    this.apiService.checkEmpPreference(this.empID).subscribe({
      next:(data)=>{
        if(!data){this.dialogRef.open(this.preferredTempEntry, this.loggedEmpInfo.dialogConfig)}
      },
      error:(error)=>{console.log(error)}
    })
  }

  closeTempDialog(){
    this.dialogRef.closeAll();
  }

  displayCurrentWeather(cityName:string){
    this.apiService.getCurrentWeather(cityName).subscribe({
      next:(data)=>{console.log(data)},
      error:(error)=>{console.log(error)}
    })
  }

  displayForecastWeather(cityName:string){
    this.apiService.getForecastWeather(cityName).subscribe({
      next:(data)=>{console.log(data)},
      error:(error)=>{console.log(error)}
    })
  }
}
