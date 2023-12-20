import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meet } from '@models/meet.model';
import { MeetingsDataService } from '@services/meetings-data.service';
import { UserDataService } from '@services/user-data.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})

export class AddEventComponent {

  meet: Meet = new Meet(0, '', '', '', '', '', 0);

  time: string = '';

  preview: any;

  constructor(private meetDataService: MeetingsDataService,
    private userDataService: UserDataService,
    private router: Router) {

  }

  onAvatarChange(event: any) {
      this.preview = event.target.files[0];
  }


  addEvent(): void {

    // const date = new Date(this.meet.date);
    // const [hours, minutes] = this.time.split(':');

    // date.setHours(Number(hours));
    // date.setMinutes(Number(minutes));

    // const formattedDate = date.toISOString();
    // console.log("Chat GPT:", formattedDate, "2023-12-19T19:10:44.809Z");

    const [year, month, day] = this.meet.date.split('-');
    const [hours, minutes] = this.time.split(':');

    const date = new Date();
    date.setUTCFullYear(Number(year));
    date.setUTCMonth(Number(month) - 1); // Месяцы в JavaScript начинаются с 0
    date.setUTCDate(Number(day));
    date.setUTCHours(Number(hours));
    date.setUTCMinutes(Number(minutes));
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    const formattedDate = date.toISOString();
    console.log(formattedDate);


    const reader = new FileReader();
    if (this.preview != null) {
      reader.readAsDataURL(this.preview);
      reader.onload = (e: any) => {

        const reqMeet = {
          "image": reader.result,
          "name": this.meet.name,
          "description": this.meet.description,
          "date": formattedDate,
          "address":  this.meet.address,
          "maxUsers": 7,
          "authorId": this.userDataService.getCurrentUser()?.id
        };
    
        this.meetDataService.addEvent(reqMeet).subscribe({
          next: response => {
            
            const updatedUser = response;
            // this.userDataService.setCurrentUser(updatedUser);
            // this.userDataService.isLoggedIn = true;
            console.log('Пользователь успешно зарегистрирован', response);
            this.router.navigate(["home/meetings"]);
          },
          error: error => {
            console.error('Ошибка создания события', error);
          }
        }
        );
      };
    }
    else{
      const reqMeet = {
        "image": "",
        "name": this.meet.name,
        "description": this.meet.description,
        "date": formattedDate,
        "address":  this.meet.address,
        "maxUsers": 7,
        "authorId": this.userDataService.getCurrentUser()?.id
      };
  
      this.meetDataService.addEvent(reqMeet).subscribe({
        next: response => {
          
          const updatedUser = response;
          // this.userDataService.setCurrentUser(updatedUser);
          // this.userDataService.isLoggedIn = true;
          console.log('Пользователь успешно зарегистрирован', response);
          this.router.navigate(["home/meetings"]);
        },
        error: error => {
          console.error('Ошибка создания события', error);
        }
      }
      );
    }

   
  }
}
