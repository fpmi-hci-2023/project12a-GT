import { Component } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { Meet } from "@models/meet.model";
import { MeetingsDataService } from '@services/meetings-data.service';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrl: './meet.component.scss'
})
export class MeetComponent {
  id: number | undefined;
  private subscription: Subscription;

  // currentMeet: Meet = new Meet('','','','');
  currentMeet: Meet | undefined;

  constructor(private activateRoute: ActivatedRoute,
              private meetingsData: MeetingsDataService){
      
      this.subscription = activateRoute.params.subscribe(params=>this.id=params["id"]);
  }

  ngOnInit(): void {
    // this.curMeetings = this.meetingsData.getMeetings();
    
    // console.log("Meetings: ", this.meetingsData.getMeetings());
    console.log("Id: ", this.id);

    var tempMeet = this.meetingsData.getMeetings().find(item => item.id == this.id);
    
    if(tempMeet !== undefined){
      this.currentMeet = tempMeet;
    }
    console.log("Meet: ", this.currentMeet);
  }

}
