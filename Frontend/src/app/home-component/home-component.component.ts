import { Component } from '@angular/core';
import { Announcement } from '../announcement/announcement';
import { Category } from '../announcement/category';
import { AnnouncementService } from '../services/announcement.service';
import { NotificationServiceService } from '../services/notification-service.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent {
  notificationMessage: string;
  constructor ( private announcementService: AnnouncementService, private notificationService: NotificationServiceService ){};
  announcements: Announcement[] = [];
  selectedCategory: Category | null = null;
  filteredAnnouncements: Announcement[] | undefined;
  onCategorySelected(category: Category) {
    this.selectedCategory = category;
    this.filterAnnouncements();
  }
  filterAnnouncements() {
    if (this.selectedCategory) {
      if (this.selectedCategory.id === '4') {
        this.filteredAnnouncements = this.announcements;
      } else {
        this.filteredAnnouncements = this.announcements.filter(
          announcement => announcement.categoryId === this.selectedCategory!.id 
        );
      }
    } else {
      this.filteredAnnouncements = this.announcements;
    }
  }
  onAnnouncementDeleted(announcementId: string) {
    this.announcements = this.announcements.filter(
      announcement => announcement.id !== announcementId
    );
    if (this.selectedCategory) {
      this.filteredAnnouncements = this.announcements.filter(
        announcement => announcement.categoryId === this.selectedCategory!.id
      );
    } else {
      this.filteredAnnouncements = this.announcements;
    }
  }
  
  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe(
      (announcementsData: Announcement[]) => {
        this.announcements = announcementsData;
        this.filteredAnnouncements = this.announcements;
      },
      (error: any) => {
        console.error('Error fetching announcements:', error);
      }
    );
    
    
    this.notificationService.initWebSocket();
    this.notificationService.notificationSubject.subscribe(hasNotifications => this.notificationMessage = hasNotifications ? "New notifications, please refresh the page" : "");
  }

}
