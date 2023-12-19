import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:1111/api'; 

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    // const url = `${this.apiUrl}/register`; 
    // return this.http.post(url, user);
    
    const registeredUser: User = new User(
      '123',
      user.username,
      user.firstName,
      user.lastName,
      user.avatar,
      user.password
    );

    return of(registeredUser);
  }

  loginUser(user: any): Observable<any> {
    // const url = `${this.apiUrl}/login`; 
    // return this.http.post(url, user);
    
    // const body = {username: user.username, password: user.password};    
    // return this.http.post(url, body); 

    const registeredUser: User = new User(
      '123',
      user.username,
      user.firstName,
      user.lastName,
      user.avatar,
      user.password
    );

    return of(registeredUser);
  }
}
