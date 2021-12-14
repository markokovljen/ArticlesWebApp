import { IArticleBase } from "./iarticlebase";
import { Photo } from "./photo";

  export class Article implements IArticleBase{
    id!:number;
    content!:string;
    title!:string;
    journalistId!:number;
    journalist!:string;
    photo!:Photo;
  }

  export class ArticleUpdate{
    content!:string;
  }
