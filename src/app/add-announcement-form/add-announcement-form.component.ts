import { Component } from '@angular/core';
import { Category } from '../announcement/category';
import { Router } from '@angular/router';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../announcement/announcement';
import { CategoryService } from '../services/category.service';
import { NotificationServiceService } from '../services/notification-service.service';


@Component({
  selector: 'app-add-announcement-form',
  templateUrl: './add-announcement-form.component.html',
  styleUrls: ['./add-announcement-form.component.scss']
})
export class AddAnnouncementFormComponent {
 constructor(private router: Router, private announcementService: AnnouncementService, private categoryService: CategoryService, private notificationService :NotificationServiceService ) {}
 private unsavedChanges: boolean = false;
 private originalTitle: string = '';
 private originalAuthor: string = '';
 private originalMessage: string = ''; 
 id:string = '';
 title:string = '';
 author:string = '';
 message:string = '';
 categories: Category[] = [];
 selectedCategory: string  ='';
 newAnnouncement: Announcement = {id:'', title: '', author: '', description: '', categoryId: ''};
 ngOnInit(): void {
  this.categoryService.getCategories().subscribe(
    (categoriesData: Category[]) => {
      this.categories = categoriesData;
      this.selectedCategory = this.categories[0].id;
    },
    (error: any) => {
      console.error('Error fetching categories:', error);
    }
  );
}
onSubmit() {
  this.newAnnouncement = {id:this.id, title: this.title, author: this.author, description: this.message, categoryId: this.selectedCategory };
  this.announcementService.addAnnouncement(this.newAnnouncement).subscribe(r => this.notificationService.sendMessage("BroadcastMessage", [r]));
  this.router.navigate(['/']);
}

private checkForUnsavedChanges() {
  this.unsavedChanges =
    this.title !== this.originalTitle ||
    this.author !== this.originalAuthor ||
    this.message !== this.originalMessage;
}
 hasUnsavedChanges(): boolean {
  return this.unsavedChanges;
}
onCancel() {
  this.checkForUnsavedChanges();
  if (this.unsavedChanges) {
    const confirmed = confirm('You have unsaved changes. Do you want to discard them?');
    if (confirmed) {
      this.resetForm();
    }
  } else {
    this.router.navigate(['/']);
  }
}
private resetForm() {
  this.title = this.originalTitle;
  this.author = this.originalAuthor;
  this.message = this.originalMessage;
  this.unsavedChanges = false;
}
}