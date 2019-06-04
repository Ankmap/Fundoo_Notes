import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit() {
    if (this.card) {
      this.isPin = this.card.isPin;
    }
  }

  //pin()
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card
  @Output() onChange = new EventEmitter;
  private isPin: boolean = false;
  pin() {
    this.isPin = !this.isPin;
    if (this.card) {
      let id = [];
      id.push(this.card.id);
      var body = {
        "isPin": this.isPin,
        "noteIdList": [id] /* Access noteIdList for particular note*/
      }
      console.log('pin Unpin ====>',body)    
      this.noteService.pinUnpinNotes(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.onChange.emit({})
          console.log('pinUnpin ==>', response);
        });
    }
    else {
      this.onChange.emit(this.isPin);
    }
  }

}
