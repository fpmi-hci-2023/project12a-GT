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

    // console.log( 'User sign up data:', this.user);
    const reader = new FileReader();
    if (this.preview != null) {
      reader.readAsDataURL(this.preview);
      reader.onload = (e: any) => {
        // this.avatarUrl = e.target.result;

        const reqMeet = {
          "image": reader.result,
          "name": this.meet.name,
          "description": this.meet.description,
          "date": "2023-12-19T19:10:44.809Z",
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
        "date": "2023-12-19T19:10:44.809Z",
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
