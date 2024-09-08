import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoggedEmployeeInfo } from '../../_services/employeeInfo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { preferredTemp } from '../../_customTypes/employeeInfo';
import { MatIcon } from '@angular/material/icon';
import { currentWeather } from '../../_customTypes/weatherInfo';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-temp-selector',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatIcon, MatError],
  templateUrl: './temp-selector.component.html',
  styleUrl: './temp-selector.component.scss'
})
export class TempSelectorComponent {

  @ViewChild('preferredTempEntry',{static:true}) preferredTempEntry!:TemplateRef<any>;

  empID!:any;
  empName!:any;
  preferredTemp!:number;
  postSuccessMsg!:string;
  currentWeatherData:currentWeather = {
    city:'',
    currentDate:'',
    temp:0,
    feels_like:0,
    min_temp:0,
    max_temp:0
  };
  forecastWeatherData!:any;
  preferredMinTemp:number = 0;
  preferredMaxTemp:number = 0;

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
          this.closeTempDialog();
          this.sendAvgPreferredTemp();
        },1500)
      },
      error:(error)=>{console.log(error)}
    })
  }

  hasEmployeePreferenceSaved(){
    this.apiService.checkEmpPreference(this.empID).subscribe({
      next:(data)=>{
        if(!data){
          this.dialogRef.open(this.preferredTempEntry, this.loggedEmpInfo.dialogConfig)
        }
      },
      error:(error)=>{console.log(error)}
    })
  }

  closeTempDialog(){
    this.dialogRef.closeAll();
  }

  displayCurrentWeather(cityName:string){
    this.apiService.getCurrentWeather(cityName).subscribe({
      next:(data)=>{
        const cDate = new Date(data.dt * 1000).toLocaleString().split(',')[0].trim();
        this.currentWeatherData = {
          city:data.name,
          currentDate: cDate,
          temp:data.main.temp,
          feels_like:data.main.feels_like,
          min_temp:data.main.temp_min,
          max_temp:data.main.temp_max
        };
        this.preferredMinTemp = Math.ceil(data.main.temp_min) - 2;
        this.preferredMaxTemp = Math.ceil(data.main.temp_max) + 2;
      },
      error:(error)=>{console.log(error)}
    })
  }

  displayForecastWeather(cityName:string){
    this.apiService.getForecastWeather(cityName).subscribe({
      next:(data)=>{
        this.forecastWeatherData = data;
      },
      error:(error)=>{console.log(error)}
    })
  }

  sendAvgPreferredTemp(){
    this.apiService.fetchAvgPreferredTemp().subscribe({
      next:(data)=>{console.log('average preferred temp: '+data)},
      error:(error)=>{console.log(error)}
    })
  }

}
