import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterString: string, articleTitle:string): any[]{
    const resultArray=[];

    if(value.length===0 || filterString ==='' || articleTitle===''){
      return value;
    }

    for(const item of value){
      if(item[articleTitle] ===filterString){
        resultArray.push(item);
      }
    }

    return  resultArray;


  }

}
