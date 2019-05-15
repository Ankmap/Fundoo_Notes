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
