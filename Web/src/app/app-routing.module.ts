import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { MeetComponent } from './components/meet/meet.component';
import { AddEventComponent } from './components/add-event/add-event.component';

const homeRoutes: Routes = [
  { path: "meetings", component: MeetingsComponent},
  { path: "meet/:id", component: MeetComponent},
  { path: "addEvent", component: AddEventComponent},
];

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' },
                        { path: 'home', component: HomeComponent, children: homeRoutes },
                        { path: 'register', component: SignUpComponent },
                        { path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }