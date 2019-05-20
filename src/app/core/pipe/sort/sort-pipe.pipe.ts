/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - sort-pipe.pipe.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {
  transform(ary: any, fn: Function = (a, b) => a > b ? 1 : -1): any {
    return ary.sort(fn)
  }

}
