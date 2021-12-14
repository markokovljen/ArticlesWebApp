import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { IArticleBase } from 'src/app/model/iarticlebase';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles : IArticleBase[];
  Title='';
  SearchTitle='';
  SortbyParam = '';
  SortDirection='asc'

  constructor(private articleService:ArticleService,
              private alertify:AlertifyService,
              private router:Router) {
    this.articles=[];
  }

  ngOnInit() {
    this.articleService.getAllArticles().subscribe(
      data=>{
        this.articles=data;
      },error=>{
        console.log("httperror")
        console.log(error);
      }
    )

  }

  onCityFilter(){
    this.SearchTitle=this.Title;
  }

  onCityFilterClear(){
      this.SearchTitle='';
      this.Title='';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
        this.SortDirection = 'asc';
    } else {
        this.SortDirection = 'desc';
    }
}

  onDuplicateData(){
    this.articleService.duplicateDataArticle().subscribe(
      ()=>{
        this.alertify.success("Congrats, your are duplicate our data!");
        this.ngOnInit()
      }
    )
  }
  onRefreshData(){
    this.ngOnInit()
  }



}
