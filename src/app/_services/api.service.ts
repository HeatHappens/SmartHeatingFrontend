import { Injectable } from "@angular/core";
import { login, preferredTemp, signup } from "../_customTypes/employeeInfo";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn:'root'
})
export class ApiService{

    private apiURL:string = 'http://localhost:3000';
    private weatherAPI:string = '';

    constructor(private http:HttpClient){}

    signUpEmployee(newEmployee:Partial<signup>):Observable<any>{
        return this.http.post<any>(`${this.apiURL}/employees`,newEmployee)
    }

    loginEmployee(loginData:login):Observable<any>{
        return this.http.get<signup[]>(`${this.apiURL}/employees`,{
            params:{
                emailID:loginData.emailID
            }
        }).pipe(
            map((employees)=>{
                if(employees.length === 0){
                    throw new Error('Employee not found!')
                }
                const employee = employees[0];
                if(employee.password !== loginData.password){
                    throw new Error('Invalid Password!')
                }
                return {
                    empID:employee.id,
                    firstName:employee.firstName,
                    lastName:employee.lastName,
                    emailID:employee.emailID
                }
            })
        )
    }

    employeePreferredTemp(data:preferredTemp):Observable<any>{
       return this.http.post<any>(`${this.apiURL}/preferredDayTemp`,data)
    }

    checkEmpPreference(empID:string):Observable<any>{
        return this.http.get<preferredTemp[]>(`${this.apiURL}/preferredDayTemp`,{
            params:{
                id:empID
            }
        }).pipe(
            map((data)=>{
                if(data.length != 0){
                    return true
                }else{
                    return false
                }
            })
        )
    }
}

