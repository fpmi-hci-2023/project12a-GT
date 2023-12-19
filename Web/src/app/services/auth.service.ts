import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://localhost:7145'; 

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/User/register`;

    const header = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })}

    return this.http.post(url, user, header);
    
    // const registeredUser: User = new User(
    //   '123',
    //   user.username,
    //   user.firstName,
    //   user.lastName,
    //   user.avatar,
    //   user.password
    // );

    // return of(registeredUser);
  }

  loginUser(user: any): Observable<any> {

    const url = `${this.apiUrl}/User`; 

    // user = user.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = user ?
     { params: new HttpParams().set('password', user.password).set('username', user.username) } : {};
  
    return this.http.get(url, options)

      // .pipe(
      //   catchError(this.handleError<Hero[]>('searchHeroes', []))
      // );

    // const header = {headers: new HttpHeaders({
    //   'Content-Type': 'application/json',
    // })}

    // params = {"login": login}
    
    // return this.http..get(url, params=params)
//     let httpParams = new HttpParams().set('aaa', '111');
// httpParams.set('bbb', '222');

//     return this.httpClient.get("/api/countries", {params: data})

    // return this.http.get(url, );

    // return this.http.post(url, user);
    
    // const body = {username: user.username, password: user.password};    
    // return this.http.post(url, body); 

    // const registeredUser: User = new User(
    //   '123',
    //   user.username,
    //   user.firstName,
    //   user.lastName,
    //   user.avatar,
    //   user.password
    // );

    // return of(registeredUser);
  }
}
