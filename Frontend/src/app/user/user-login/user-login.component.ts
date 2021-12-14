import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService:AuthenticationService,
              private alertify:AlertifyService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin(loginForm:NgForm){
      this.authService.authUser(loginForm.value).subscribe(
        (response:any)=>{
          const user=response;
          console.log(user);
          localStorage.setItem('token',user.token);
          localStorage.setItem('username',user.username);
          localStorage.setItem('isadministrator',user.isAdministrator);
          this.alertify.success('Login Successuful');
          this.router.navigate(['/']);
        }
      )
  }

}
