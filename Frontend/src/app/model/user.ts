export interface UserForRegister{
  firstName:string;
  lastName:string;
  userName:string;
  email?:string;
  password:string;
  confirmPassword:string;
  mobile?:number;
  isAdministrator?:boolean;
}

export interface UserForLogin{
  userName:string;
  password:string;
  token:string;
}

export interface UserForModify{
  firstName:string;
  lastName:string;
}
