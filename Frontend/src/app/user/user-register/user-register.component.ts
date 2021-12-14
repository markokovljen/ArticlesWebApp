import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors,ValidatorFn, Validators } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!:UserForRegister;
  userSubmitted!:boolean;
  administratorUser!:boolean;

  constructor(private fb: FormBuilder,
              private alertify : AlertifyService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm=this.fb.group({
      firstName:[null,Validators.required],
      lastName:[null,Validators.required],
      userName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      confirmPassword:[null,Validators.required],
      mobile:[null,[Validators.required,Validators.maxLength(10)]],
      isAdministrator:[false]
    },{
      validators:this.checkPasswords
    })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : {
       notSame: true
    }
 }

  onSubmit(){
    console.log(this.registrationForm.value)
    console.log(this.registrationForm.valid)
    this.userSubmitted=true;

    if(this.registrationForm.valid){
      this.applyUser();
      console.log(this.user);
      this.authService.registerUser(this.user).subscribe(()=>
      {
        this.onReset();
        this.alertify.success('Congrats, you are successfully registered');
      })
    }

  }

  applyUser(){
    let tempAdmin = (this.administrator.value === 'true')
    this.user={
    firstName:this.firstName.value,
    lastName:this.lastName.value,
    userName: this.userName.value,
    email:this.email.value,
    password:this.password.value,
    confirmPassword:this.confirmPassword.value,
    mobile: this.mobile.value,
    isAdministrator:tempAdmin
    }
  }

  onReset(){
    this.userSubmitted=false;
    this.registrationForm.reset();

  }

  isAdministrator(){
    let myBool=(localStorage.getItem('isadministrator')?.toLowerCase()==='true');
    this.administratorUser=myBool;
    return this.administratorUser;
  }


  get firstName(){
    return this.registrationForm.get('firstName') as FormControl;
  }

  get lastName(){
    return this.registrationForm.get('lastName') as FormControl;
  }

  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }
  get administrator(){
    return this.registrationForm.get('isAdministrator') as FormControl;
  }

}
