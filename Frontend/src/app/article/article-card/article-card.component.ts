import { Component, Input, OnInit } from '@angular/core';
import { IArticleBase } from 'src/app/model/iarticlebase';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: IArticleBase
  @Input() hideIcons!: boolean;
  constructor() { }

  ngOnInit() {

  }

}
