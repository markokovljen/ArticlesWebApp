import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForModify } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ModifyService } from 'src/app/services/modify.service';


@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {

  modifyForm!:FormGroup;
  userSubmitted!:boolean;
  profile!:UserForModify;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private fb:FormBuilder,
              private modifyService:ModifyService,
              private alertify:AlertifyService) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data:any)=>{
        this.profile=data['armodify'];
        console.log(this.profile);
      }
    )

    this.updateModifyForm();
  }

  updateModifyForm(){
    this.modifyForm=this.fb.group({
      firstName:[this.profile.firstName,Validators.required],
      lastName:[this.profile.lastName,Validators.required]
    })
  }

  onSubmit(){
    this.userSubmitted=true;
    if(this.modifyForm.valid){
      this.applyModifyProfile();
      const propUsername=this.route.snapshot.params['username'];
      this.modifyService.modifyProfile(propUsername,this.profile).subscribe(()=>
    {
      this.alertify.success('Congrats, you are successfully modifed your profile')
    })
    }
  }

  applyModifyProfile(){
    this.profile={
      firstName:this.firstName.value,
      lastName:this.lastName.value
    }
  }


  get firstName(){
    return this.modifyForm.get('firstName') as FormControl;
  }

  get lastName(){
    return this.modifyForm.get('lastName') as FormControl;
  }

}
