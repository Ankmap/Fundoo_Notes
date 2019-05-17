import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssertNotNull } from '@angular/compiler';
import { HttpService } from './http/http.service';
import { NotesService } from './notes/notes.service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
private assignData = new BehaviorSubject<any[]>([]);
allNote = this.assignData.asObservable();
  constructor(private http : NotesService ) {
    this.getAllNote();
   }
  getAllNote(){
    this.http.getNotes().subscribe(data => {console.log(data.data.data);
    ;this.assignData.next(data.data.data)})
  }
}
