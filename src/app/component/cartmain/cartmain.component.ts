import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cartmain',
  templateUrl: './cartmain.component.html',
  styleUrls: ['./cartmain.component.scss']
})
export class CartmainComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }
  private placedOrder: boolean = true;
  ngOnInit() {
  }

  placeOrder(){
    this.placedOrder = !(this.placedOrder);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
