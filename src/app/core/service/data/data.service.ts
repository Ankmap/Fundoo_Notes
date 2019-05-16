import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Purpose : The BehaviorSubject has the characteristic that it stores the “current” value. This means that you can always directly get the last emitted value from the BehaviorSubject.
 **/ 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private viewSource = new BehaviorSubject (false)
  constructor() { }

  changeView(message: boolean){
    this.viewSource.next(message);
  }
}
