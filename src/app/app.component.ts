import { Component} from '@angular/core';
import { Announcement } from './announcement/announcement';
import { Category } from './announcement/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notifications-app';
  announcements: Announcement[] = [
    { title: 'Announcement 1', message: 'Message 1', author: 'Author 1', category: { id:1, name: 'Course' } },
    { title: 'Announcement 2', message: 'Message 2', author: 'Author 2', category: { id:2, name: 'General' } },
    { title: 'Announcement 3', message: 'Message 3', author: 'Author 3', category: { id:3, name: 'Laboratory'} },
    { title: 'Announcement 4', message: 'Message 4', author: 'Author 4', category: { id:1, name: 'Course' } },
    { title: 'Announcement 5', message: 'Message 5', author: 'Author 5', category: { id:1, name: 'Course' } },
  ];
  selectedCategory: Category | null = null;
  filteredAnnouncements: Announcement[] | undefined;
  onCategorySelected(category: Category) {
    this.selectedCategory = category;
    this.filterAnnouncements();
  }
  filterAnnouncements() {
    if (this.selectedCategory) {
      this.filteredAnnouncements = this.announcements.filter(
        announcement => announcement.category.name===this.selectedCategory!.name && announcement.category.id === this.selectedCategory!.id
      );
      if (this.selectedCategory.id === 4) {
        this.filteredAnnouncements = this.announcements;
      }
    } else {
      this.filteredAnnouncements = this.announcements;
    }
  }
}
