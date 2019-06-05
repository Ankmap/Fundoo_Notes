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

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card
  @Output() onChangePin = new EventEmitter;
  private isPined: boolean = false;

  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit() {
    if (this.card) {
      this.isPined = this.card.isPined;
    }
  }

  //pin()
  
  pin() {
    this.isPined = !this.isPined;
    if (this.card) {
      let id = [];
      id.push(this.card.id);
      var body = {
        "isPined": this.isPined,
        "noteIdList": [id] /* Access noteIdList for particular note*/
      }
      console.log('pin Unpin ====>',body)    
      this.noteService.pinUnpinNotes(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.onChangePin.emit({})
          console.log('pinUnpin ==>', response);
        });
    }
    else {
      this.onChangePin.emit(this.isPined);
    }
  }

}
