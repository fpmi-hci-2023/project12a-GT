import { Component, OnInit } from '@angular/core';
import { UserDataService } from '@services/user-data.service';
import { User, UserDTO } from '@models/user.model';
import { Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  currentUser: UserDTO | null;

  constructor(private router: Router, private userData: UserDataService) { 
      this.currentUser = null;
  }

  ngOnInit(): void {
    if (!this.userData.isLoggedIn) {
      this.router.navigate(["login"]);
    }
    console.log( 'After login in home:', this.userData.getCurrentUser());
    this.currentUser = this.userData.getCurrentUser();
  }
  
  gologout(){
    this.userData.isLoggedIn = false;
    this.router.navigate(["login"]); // переход на корень приложения
  }
  goEvents(){
    this.router.navigate(["home/meetings"]); // переход на корень приложения
  }
}
