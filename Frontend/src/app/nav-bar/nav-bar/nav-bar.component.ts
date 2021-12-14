import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser!: string;
  administratorUser!:boolean;

  constructor(private alertify: AlertifyService,
              private router:Router) { }

  ngOnInit() {
  }

  loggedin(){
    this.loggedinUser = localStorage.getItem('username')!;
    return this.loggedinUser;
  }

  isAdministrator(){
    let myBool=(localStorage.getItem('isadministrator')?.toLowerCase()==='true');
    this.administratorUser=myBool;
    return this.administratorUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isadministrator');
    this.alertify.success("You are logged out!");
    this.router.navigate(['/']);
  }
}
