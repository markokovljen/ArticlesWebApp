import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/services/article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailResolverService implements Resolve<Article> {

  constructor(private router: Router,
              private articleService: ArticleService) { }

    resolve(route:ActivatedRouteSnapshot,state : RouterStateSnapshot) :Observable<Article>|Article | any{
        const articleId=route.params['id'];
        return this.articleService.getArticle(+articleId).pipe( //da bi uhvatili error moramo koristiti pipe
          catchError(error=>{
            this.router.navigate(['/'])
            return of(null);
          })

        );

    }
    }



