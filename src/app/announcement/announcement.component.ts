import { Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { Announcement } from './announcement';
import { AnnouncementService } from '../services/announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent {
  // message: string = 'Acesta este mesajul.';
  // title: string = 'mEsAj';
  // author: string = 'Razvan R';
  constructor(private router: Router, private announcementService: AnnouncementService) { }
  @Input() announcement!: Announcement;
  @Output() announcementDeleted = new EventEmitter<string>();
  onEdit(): void {
    const announcementId = this.announcement.id;
    this.router.navigate(['/edit', announcementId]);
  }
  onDelete() {
    const announcementIdToDelete = this.announcement.id;
    this.announcementService.deleteAnnouncementById(announcementIdToDelete).subscribe(
      () => {
        // Emit the event to inform the parent component (HomeComponent) about the deletion
        this.announcementDeleted.emit(announcementIdToDelete);
      },
      (error: any) => {
        console.error('Error deleting announcement:', error);
      }
    );
  }
}
