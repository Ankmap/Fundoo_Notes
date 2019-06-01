import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Label } from 'src/app/core/model/label/label';

@Component({
  selector: 'app-getlabel',
  templateUrl: './getlabel.component.html',
  styleUrls: ['./getlabel.component.scss']
})
export class GetlabelComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private labelName=''
  private label:Label[]=[];
  private labelNoteList = []
  constructor(
    private noteService : NotesService,
  ) { }

  ngOnInit() {
    this.labelNoteLists();
  }

  refresh(event){
    if(event){
      this.labelNoteLists();
    }
  }

  labelNoteLists(){
    this.noteService.getNotesListByLabel(this.labelName)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response)=>{
      this.label = response["data"].data;
      this.labelNoteList = []
      for(let i=this.label.length;i>0;i--){
        this.labelNoteList.push(this.label[i-1])
      }
      console.log('labelNoteLists ===>',response);
      
    },(error)=>{
      console.log("Error ===>",error);
      
    })
  }
}
