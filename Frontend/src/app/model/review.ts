import { IReview } from "./ireview";

export class Review implements IReview{
  id!:number;
  reviewContent!:string;
  articleId!:number;
  article!:string;
}
