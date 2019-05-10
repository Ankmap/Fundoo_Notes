import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-lifecycle',
  templateUrl: './component-lifecycle.component.html',
  styleUrls: ['./component-lifecycle.component.scss']
})
export class ComponentLifecycleComponent implements OnInit {
  data: number = 100;

  constructor() {
    console.log(`new - data is ${this.data}`);
  }

  ngOnChanges() {
    console.log(`ngOnChanges - data is11 ${this.data}`);
  }
  ngOnInit() {
    console.log(`ngOnInit  - data is22 ${this.data}`);
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
  
  fnAddNumber(): void {
    this.data += 100;
  }
  deleteNumber(): void {
    this.data -= 10;
  }
}
