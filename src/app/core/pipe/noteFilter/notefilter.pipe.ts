import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notefilter'
})
export class NotefilterPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  // transform(items: any[], term: string): any {
  //   // I am unsure what id is here. did you mean title?
  //   return items.filter(item => item.id.indexOf(term) !== -1);
  // }

  transform(value: any[], filterBy: string): any[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((product: any) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}
