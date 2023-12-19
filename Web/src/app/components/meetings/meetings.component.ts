import { Component } from '@angular/core';
import { MeetingsDataService } from '@services/meetings-data.service';
import { UserDataService } from '@services/user-data.service';
import { Router } from "@angular/router";
import { Meet } from "@models/meet.model";



@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})

export class MeetingsComponent {
  itemList: Meet[] = [];

  constructor(private router: Router,
              private meetingsService: MeetingsDataService,
              public userData: UserDataService) { }

  ngOnInit() {
      this.itemList = this.meetingsService.getItems();
      console.log("Загрузили новый список митингов с сервера", this.itemList)
  }

  handleButtonClick(item: any) {
    // Обработка нажатия на кнопку для элемента item
    // Можете выполнить здесь нужные вам действия
    console.log('Нажали на кнопку для элемента:', item);
    this.router.navigate(["home/meet/" + item.id]);
  }
}
