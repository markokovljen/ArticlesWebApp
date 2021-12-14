import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { IArticleBase } from 'src/app/model/iarticlebase';
import { Ikeyvaluepair } from 'src/app/model/Ikeyvaluepair';
import { Review } from 'src/app/model/review';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  addReviewForm!:FormGroup;
  articleList!:IArticleBase[];
  reviewSubmitted!:boolean;
  review = new Review();

  constructor(private fb:FormBuilder,
              private articleService:ArticleService,
              private reviewService:ReviewService,
              private alertify:AlertifyService,
              private router:Router) { }

  ngOnInit() {
    this.createAddReviewForm();

    this.articleService.getAllArticles().subscribe(data=>
      {
        this.articleList=data;
        console.log(this.articleList)
      })
  }

  createAddReviewForm(){
    this.addReviewForm=this.fb.group({
      reviewContent:[null,[Validators.required, Validators.minLength(10)]],
      article:[null,Validators.required]
    })
  }

  onSubmit(){
    this.reviewSubmitted=true;

    if(this.allFieldsValid()){
      this.mapReview();
      this.reviewService.addReview(this.review).subscribe(
        ()=>{
          this.alertify.success("Congrats, your review listed successfully on out website");
          this.router.navigate(['/']);
        }
      )
    }
    else {
      this.alertify.error('Provide all entries')
    }
  }

  allFieldsValid(): boolean{
    if(this.reviewContent.invalid || this.article.invalid)
    {
      return false;
    }
    return true;
  }

  mapReview():void{
    this.review.reviewContent=this.reviewContent.value;
    this.review.articleId=+this.article.value;
  }

  get reviewContent(){
    return this.addReviewForm.get('reviewContent') as FormControl;
  }

  get article(){
    return this.addReviewForm.get('article') as FormControl;
  }

}
