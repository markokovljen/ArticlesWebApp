import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, ArticleUpdate } from '../model/article';
import { Ikeyvaluepair } from '../model/Ikeyvaluepair';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class
ArticleService {

  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllArticles() : Observable<Article[]>{
      return this.http.get<Article[]>(this.baseUrl+'/article/list')
  }

  getArticle(id:number){
    return this.http.get<Article>(this.baseUrl+'/article/detail/'+id.toString())
  }

  getAllJournalists() : Observable<Ikeyvaluepair[]>{
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl+'/journalist/list')
  }
  getAllReviews(articleId:number) : Observable<Review[]>{
    return this.http.get<Review[]>(this.baseUrl+'/review/list/'+articleId.toString())
}


  setOptions(){
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+localStorage.getItem('token')
      })
    }
    return httpOptions;
  }

  addArticle(article:Article){
    return this.http.post(this.baseUrl+'/article/add',article,this.setOptions())
  }

  deleteArticle(id:number){
    return this.http.delete(this.baseUrl+'/article/delete/'+id.toString(),this.setOptions());
  }

  updateArticle(id:number,articleContent:ArticleUpdate){
    return this.http.put(this.baseUrl+'/article/updateArticleContent/'+id.toString(),articleContent,this.setOptions());
  }

  duplicateDataArticle(){
    return this.http.get<Article>(this.baseUrl+'/article/duplicateData',this.setOptions())
  }

  uploadPhotoArticle(formData:FormData,id:number){
    return this.http.post(this.baseUrl+'/article/add/photo/'+id.toString(),formData,this.setOptions())
  }
}
