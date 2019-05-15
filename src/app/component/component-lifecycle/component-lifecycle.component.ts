import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-lifecycle',
  templateUrl: './component-lifecycle.component.html',
  styleUrls: ['./component-lifecycle.component.scss']
})
export class ComponentLifecycleComponent implements OnInit {

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
  ngOnDestroy() {
    console.log("ngOnDestroy88");
  }

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
}
