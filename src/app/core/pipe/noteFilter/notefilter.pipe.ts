import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notefilter'
})
export class NotefilterPipe implements PipeTransform {
  transform(value: any[], filterBy: string): any[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((product: any) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}
