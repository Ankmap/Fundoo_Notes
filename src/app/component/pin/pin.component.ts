import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();


  @Input() card
  @Output() onChangePin = new EventEmitter;
  private isPined: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.card) {
      this.isPined = this.card.isPined;
    }
  }

  pin() {
    this.isPined = !this.isPined;
    this.onChangePin.emit(this.isPined);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
