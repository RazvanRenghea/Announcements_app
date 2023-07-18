import { Component, Input} from '@angular/core';
import { Announcement } from './announcement';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent {
  // message: string = 'Acesta este mesajul.';
  // title: string = 'mEsAj';
  // author: string = 'Razvan R';
  @Input() announcement!: Announcement;
}
