import { Photo } from "./photo";

export interface IArticleBase{
  id:number;
  content:string;
  title:string;
  journalist:string;
  photo:Photo;
}


