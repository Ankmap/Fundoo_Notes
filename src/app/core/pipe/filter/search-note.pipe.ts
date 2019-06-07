/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - search-note.pipe.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNote'
})
export class SearchNotePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

  //   transform(value: any, input: string) {
  //     if (input) {
  //         input = input.toLowerCase();
  //         return value.filter(function (el: any) {
  //             return el.toLowerCase().indexOf(input) > -1;
  //         })
  //     }
  //     return value;
  // }
}
