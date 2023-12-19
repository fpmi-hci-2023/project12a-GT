import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  // isLoggedIn = false;
  private _isLoggedIn: boolean = false;
  private isLoggedInChanged: Subject<boolean> = new Subject<boolean>();

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
    this.isLoggedInChanged.next(value);
  }

  getisLoggedInChanged() {
    return this.isLoggedInChanged.asObservable();
  }



  private currentUser: User | null;

  constructor() {
    this.currentUser = null;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
