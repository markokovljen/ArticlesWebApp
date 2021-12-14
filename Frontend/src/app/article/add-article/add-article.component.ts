import { HttpEventType } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Article } from 'src/app/model/article';
import { Ikeyvaluepair } from 'src/app/model/Ikeyvaluepair';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  addArticleForm!:FormGroup;
  journalistList!:Ikeyvaluepair[];
  article = new Article();
  articleSubmitted!:boolean;
  public message!:string;
  public progress!:number;
  @Output() public onUploadFinished = new EventEmitter();
  formData = new FormData();


  constructor(private articleService:ArticleService,
              private fb:FormBuilder,
              private alertify:AlertifyService,
              private router:Router) { }

  ngOnInit() {
    this.createAddArticleForm()

    this.articleService.getAllJournalists().subscribe(data=>
    {
      this.journalistList=data;
    })

  }

  createAddArticleForm(){
    this.addArticleForm=this.fb.group({
      title:[null,[Validators.required, Validators.minLength(5)]],
      content:[null,[Validators.required,Validators.minLength(10)]],
      journalist:[null,Validators.required]
    })
}

// checkIfNotUpload: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {

//   if(this.formData.has('file')){
//     console.log("lala")
//   }


//   return this.formData.has('file') ? null  : {
//     notUpload:true
//     }

// }

  onSubmit(){
    this.articleSubmitted=true;

    if(this.allFieldsValid()){
      this.mapArticle();
      this.articleService.addArticle(this.article).subscribe(
        data=>{

          if(this.formData.has('file')){
            console.log("alaalal")
            this.articleService.uploadPhotoArticle(this.formData,+data)
            .subscribe(() => {

            });
          }

          this.alertify.success("Congrats, your article listed successfully on out website");
          this.router.navigate(['/']);
        }
      )
    }
    else {
      this.alertify.error('Provide all entries')
    }

  }

  mapArticle():void{
    this.article.title=this.title.value;
    this.article.content=this.content.value;
    this.article.journalistId=+this.journalist.value;
  }


  allFieldsValid(): boolean{
    if(this.title.invalid || this.content.invalid || this.journalist.invalid)
    {
      return false;
    }
    return true;
  }
  public uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];

    this.formData.append('file', fileToUpload, fileToUpload.name);


  }


  get title(){
    return this.addArticleForm.get('title') as FormControl;
  }

  get content(){
    return this.addArticleForm.get('content') as FormControl;
  }

  get journalist(){
    return this.addArticleForm.get('journalist') as FormControl;
  }


}
