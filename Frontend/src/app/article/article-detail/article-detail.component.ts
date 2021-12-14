import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, ArticleUpdate } from 'src/app/model/article';
import { IReview } from 'src/app/model/ireview';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article=new Article();
  reviews:IReview[];
  updatePage!:boolean;
  updateArticleForm!:FormGroup;
  contentSubmitted!:boolean;
  articleUpdate=new ArticleUpdate();

  constructor(private route:ActivatedRoute,
              private router:Router,
              private articleService:ArticleService,
              private alertify: AlertifyService,
              private fb:FormBuilder) {
              this.reviews=[];
              }

  ngOnInit() {

    this.route.data.subscribe(
      (data:any)=>{
        this.article=data['ardetail'];
      }
    )

    this.articleService.getAllReviews(this.article.id).subscribe(
      data=>{
        this.reviews=data;
        console.log(data);
      },error=>{
        console.log("httperror")
        console.log(error);
      }
    )
    this.updatePage=false;
    this.contentSubmitted=false;
  }



  loggedin(){
    return localStorage.getItem('username')!;
  }

  onDelete(){
    this.articleService.deleteArticle(this.article.id).subscribe(
      ()=>{
        this.alertify.success('Article succesuful deleted');
        this.router.navigate(['/']);
      }
    )
  }

  onUpdate(){
    this.updatePage=true;
    this.createUpdateArticleForm()
  }


  createUpdateArticleForm(){
    this.updateArticleForm=this.fb.group({
      content:[this.article.content,[Validators.required,Validators.minLength(10)]]
    })
  }

  onSubmit(){
    this.contentSubmitted=true;

    if(this.allFieldsValid()){
      this.mapArticleUpdate();
      this.articleService.updateArticle(this.article.id,this.articleUpdate).subscribe(
        ()=>{

          this.alertify.success("Congrats, your article updated successfully on out website");
          this.router.navigate(['/article-detail/'+this.article.id]);
          this.article.content=this.articleUpdate.content;
          this.updatePage=false;
          this.contentSubmitted=false;
        }
      )
    }
    else {
      this.alertify.error('Provide all entries')
    }

  }

  mapArticleUpdate():void{
    this.articleUpdate.content=this.content.value;
  }

  allFieldsValid(): boolean{
    if(this.content.invalid)
    {
      return false;
    }
    return true;
  }



  get content(){
    return this.updateArticleForm.get('content') as FormControl;
  }

}
