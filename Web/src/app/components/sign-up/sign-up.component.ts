import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UserDataService } from '@services/user-data.service';
import { User } from '@models/user.model';
import { Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent {

  user: User = new User('', '', '', '', null, '');

  constructor(private authService: AuthService,
               private userDataService: UserDataService,
               private router: Router) {

  }

  onAvatarChange(event: any) {
    this.user.avatar = event.target.files[0];
  }

  signUp(): void {

    // console.log( 'User sign up data:', this.user);

    
    const reader = new FileReader();
    if (this.user.avatar != null) {
      reader.readAsDataURL(this.user.avatar);
      reader.onload = (e: any) => {
        // this.avatarUrl = e.target.result;

        const reqUser = {
          "username": this.user.username,
          "name": this.user.firstName,
          "surname": this.user.lastName,
          "avatar": reader.result,
          "description": "",
          "password": this.user.password
        };
    
        this.authService.registerUser(reqUser).subscribe({
          next: response => {
            
            const updatedUser = response;
            this.userDataService.setCurrentUser(updatedUser);
            this.userDataService.isLoggedIn = true;
            console.log('Пользователь успешно зарегистрирован', response);
            this.router.navigate(["home/meetings"]);
          },
          error: error => {
            console.error('Ошибка при регистрации пользователя', error);
          }
        }
        );
      };
    }
    else{
      const reqUser = {
        "username": this.user.username,
        "name": this.user.firstName,
        "surname": this.user.lastName,
        "avatar": "",
        "description": "",
        "password": this.user.password
      };
  
      this.authService.registerUser(reqUser).subscribe({
        next: response => {
          
          const updatedUser = response;
          this.userDataService.setCurrentUser(updatedUser);
          this.userDataService.isLoggedIn = true;
          console.log('Пользователь успешно зарегистрирован', response);
          this.router.navigate(["home/meetings"]);
        },
        error: error => {
          console.error('Ошибка при регистрации пользователя', error);
        }
      }
      );
    }

   
  }

}
