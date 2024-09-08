import { Injectable } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoggedEmployeeInfo{

    private employeeLoggedObservable = new BehaviorSubject<boolean>(false);
    hasEmployeeLoggedIn$ = this.employeeLoggedObservable.asObservable();

    public dialogConfig = new MatDialogConfig();

    constructor(){
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.width = '1000px';
        this.dialogConfig.height = '550px';
    }


    updateEmployeeObservable(newData:boolean){
        this.employeeLoggedObservable.next(newData)
    }

}