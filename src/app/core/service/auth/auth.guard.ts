/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - auth.guard.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private myRoute: Router) {
  }

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.myRoute.navigateByUrl('/login');
    return false;
  }

}
