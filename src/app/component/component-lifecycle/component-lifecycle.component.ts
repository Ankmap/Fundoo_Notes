/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - component-lifecycle.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-component-lifecycle',
  templateUrl: './component-lifecycle.component.html',
  styleUrls: ['./component-lifecycle.component.scss']
})
export class ComponentLifecycleComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor() {
    console.log(' in construtor');
  }

  ngOnChanges() {
    console.log('ngOnChanges11');
  }

  ngDoCheck() {
    console.log("ngDoCheck33")
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked77");
  }
  // ngOnDestroy() {
  //   console.log("ngOnDestroy88");
  // }

  ngAfterContentInit() {
    console.log("ngAfterContentInit44");
  }
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked55");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit66");
  }

  ngOnInit() {
    console.log('ngOnInit22');
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
