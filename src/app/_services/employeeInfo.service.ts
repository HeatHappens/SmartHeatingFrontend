import { Injectable } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoggedEmployeeInfo{

    private employeeObservable = new BehaviorSubject<boolean>(false);
    hasEmployeeLoggedIn$ = this.employeeObservable.asObservable();

    public dialogConfig = new MatDialogConfig();
    constructor(){
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.width = '1000px';
        this.dialogConfig.height = '550px';
    }


    updateEmployeeObservable(newData:boolean){
        this.employeeObservable.next(newData)
    }



}