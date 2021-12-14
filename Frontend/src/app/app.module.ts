import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {Routes,RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { AppComponent } from './app.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ArticleCardComponent } from './article/article-card/article-card.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { AlertifyService } from './services/alertify.service';
import { AuthenticationService } from './services/authentication.service';
import { ModifyProfileComponent } from './user/modify-profile/modify-profile.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { ModifyService } from './services/modify.service';
import { ModifyProfileResolverService } from './user/modify-profile/modify-profile-resolver.service';
import { ArticleService } from './services/article.service';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleDetailResolverService } from './article/article-detail/article-detail-resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HttperorInterceptorService } from './services/httperor-interceptor.service';
import { AddReviewComponent } from './review/add-review/add-review.component';
import { ReviewService } from './services/review.service';



const appRoutes: Routes=[
   {path: '',component: ArticleListComponent},
   {path:'add-article',component:AddArticleComponent},
   {path: 'article-detail/:id',component:ArticleDetailComponent,
    resolve:{ardetail:ArticleDetailResolverService}},
   {path:'modify-profile/:username',component:ModifyProfileComponent,
    resolve:{armodify:ModifyProfileResolverService}},
   {path:'user/login',component:UserLoginComponent},
   {path:'user/register',component:UserRegisterComponent},
   {path:'add-review',component:AddReviewComponent},
   {path: '**',component:ArticleListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ArticleCardComponent,
    ArticleListComponent,
    AddArticleComponent,
    ModifyProfileComponent,
    UserRegisterComponent,
    UserLoginComponent,
    ArticleDetailComponent,
    AddReviewComponent,
    FilterPipe,
    SortPipe,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttperorInterceptorService,
      multi:true
    },
    AlertifyService,
    AuthenticationService,
    ModifyService,
    ModifyProfileResolverService,
    ArticleService,
    ArticleDetailResolverService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
