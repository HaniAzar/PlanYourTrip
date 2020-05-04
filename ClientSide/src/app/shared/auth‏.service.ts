import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isManager() {
    if (JSON.parse(localStorage.getItem('manager')))
      return true;
    return false;
  }

  isGuide() {
    if (JSON.parse(localStorage.getItem('guide')))
      return true;
    return false;
  }
}