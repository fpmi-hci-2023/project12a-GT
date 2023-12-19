import { Injectable } from '@angular/core';
import { Meet } from "@models/meet.model";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MeetingsDataService {

  private apiUrl = 'https://localhost:7145'; 
  private meetList: Meet[];

  constructor(private http: HttpClient) {
    this.meetList = [];
  }

  getMeetings(): Meet[] {
    return this.meetList;
  }
  
  setMeetings(value: Meet[]) {
    this.meetList = value;
  }


  addEvent(meet: any): Observable<any> {
      const url = `${this.apiUrl}/Event`;
  
      const header = {headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })}
  
      return this.http.post(url, meet, header);
  }
  

  getItems(pageNumber: number): Observable<Meet[]> {

    const url = `${this.apiUrl}/Event`; 

    // user = user.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('page', pageNumber) };
  
    // this.setMeetings(data)
    return this.http.get<Meet[]>(url, options).pipe(map(result => {
      console.log("Миты с сервера: ", result)
      this.setMeetings(result);
      return result;
    }))

  }
}
