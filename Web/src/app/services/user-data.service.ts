import { Injectable } from '@angular/core';
import { User, UserDTO } from '@models/user.model';
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



  private currentUser: UserDTO | null;

  constructor() {
    this.currentUser = null;
  }

  setCurrentUser(user: UserDTO): void {
    this.currentUser = user;
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUser;
  }
}
