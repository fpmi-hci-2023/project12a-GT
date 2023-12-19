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

  getItems(pageNumber: number): Observable<Meet[]> {

    const url = `${this.apiUrl}/Event`; 

    // user = user.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('page', pageNumber) };
  
    // this.setMeetings(data)
    return this.http.get<Meet[]>(url, options).pipe(map(result => {
      this.setMeetings(result);
      return result;
    }))

  // getItems() {

    // Здесь нужно реализовать логику получения списка элементов с сервера
    // и вернуть его в виде массива объектов
    // var base64 = 'data:image/jpeg;base64,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'
    // var data = [
    //   { id: '1', preview: base64, title: 'Заголовок 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', description: 'Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description ' },
    //   { id: '2', preview: base64, title: 'Заголовок 2', description: 'Описание 2' },
    //   { id: '3', preview: base64, title: 'Заголовок 3', description: 'Описание 3' },
    //   { id: '4', preview: base64, title: 'Заголовок 4', description: 'Описание 4' },
    //   { id: '5', preview: base64, title: 'Заголовок 5', description: 'Описание 5' },
    //   { id: '6', preview: base64, title: 'Заголовок 6', description: 'Описание 6' },
    //   { id: '7', preview: base64, title: 'Заголовок 7', description: 'Описание 7' },
    //   { id: '8', preview: base64, title: 'Заголовок 8', description: 'Описание 8' },
    //   { id: '9', preview: base64, title: 'Заголовок 1', description: 'Описание 1' },
    //   { id: '10', preview: base64, title: 'Заголовок 2', description: 'Описание 2' },
    //   { id: '11', preview: base64, title: 'Заголовок 3', description: 'Описание 3' },
    //   { id: '12', preview: base64, title: 'Заголовок 4', description: 'Описание 4' },
    //   { id: '13', preview: base64, title: 'Заголовок 5', description: 'Описание 5' },
    //   { id: '14', preview: base64, title: 'Заголовок 6', description: 'Описание 6' },
    //   { id: '15', preview: base64, title: 'Заголовок 7', description: 'Описание 7' },
    //   { id: '16', preview: base64, title: 'Заголовок 8', description: 'Описание 8' },
    //   { id: '17', preview: base64, title: 'Заголовок 1', description: 'Описание 1' },
    //   { id: '18', preview: base64, title: 'Заголовок 2', description: 'Описание 2' },
    //   { id: '19', preview: base64, title: 'Заголовок 3', description: 'Описание 3' },
    //   { id: '20', preview: base64, title: 'Заголовок 4', description: 'Описание 4' },
    //   { id: '21', preview: base64, title: 'Заголовок 5', description: 'Описание 5' },
    //   { id: '22', preview: base64, title: 'Заголовок 6', description: 'Описание 6' },
    //   { id: '23', preview: base64, title: 'Заголовок 7', description: 'Описание 7' },
    //   { id: '24', preview: base64, title: 'Заголовок 8', description: 'Описание 8' },
    // ];
    // this.setMeetings(data)
    // return data;
  }
}