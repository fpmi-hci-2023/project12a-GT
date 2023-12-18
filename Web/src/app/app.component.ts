import { Component } from '@angular/core';

import { Router} from "@angular/router";
import { UserDataService } from '@services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

  export class AppComponent {
    
    constructor(private router: Router, public userData: UserDataService){}

    title = 'Web';
    avatarUrl = ''
    username = ''

    goSignUp(){
      this.router.navigate(["register"]); // переход на корень приложения
    }

    goLogIn(){
      this.router.navigate(["login"]); // переход на корень приложения
    }

    gologout(){
      this.userData.isLoggedIn = false;
      this.router.navigate(["login"]); // переход на корень приложения
    }

    readAvatarFile() {
      var avatar = this.userData.getCurrentUser()?.avatar
      if (avatar != null) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.avatarUrl = e.target.result;
        };
        reader.readAsDataURL(avatar);
      }
    }

    
    ngOnInit() {
      this.userData.getisLoggedInChanged().subscribe((value: boolean) => {
        if (value) {
          this.readAvatarFile();
          
          var val_username = this.userData.getCurrentUser()?.username
          if (val_username) {
            this.username = val_username
          }
          // console.log("AVATAR TRYED")
        }
      });
    }
  }

