import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
// import { routes } from './app-routing.module'; // Импортируйте appRoutes
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from '@services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { UserDataService } from '@services/user-data.service';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { MeetComponent } from './components/meet/meet.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    MeetingsComponent,
    MeetComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    // RouterModule.forRoot(routes) // Используйте appRoutes
  ],
  providers: [AuthService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }