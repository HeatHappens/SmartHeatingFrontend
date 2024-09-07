export type preferredTemp = {
    id:string;
    fullName:string;
    preferredTemp:number;
}

export type signup = {
    id:string;
    firstName:string;
    lastName:string;
    emailID:string;
    password:string;
}

export type login = {
    emailID:string;
    password:string;
}