import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UserDataService } from '@services/user-data.service';
import { User } from '@models/user.model';
import { Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  user: User = new User('', '', '', '', null, '');


  constructor(private authService: AuthService,
              private userDataService: UserDataService,
              private router: Router) {

  }
  
  login(): void {
    // console.log( 'User login data:', this.user);

  
    this.authService.loginUser(this.user).subscribe({
      next: response => {
        const updatedUser = response;        
        this.userDataService.setCurrentUser(updatedUser);
        this.userDataService.isLoggedIn = true;
        console.log('Пользователь успешно вошел в систему', response);
        this.router.navigate(["home/meetings"]);
      },
      error: error => {
        console.error('Ошибка при входе пользователя', error);
      }
      }
    );
    

  }
}
