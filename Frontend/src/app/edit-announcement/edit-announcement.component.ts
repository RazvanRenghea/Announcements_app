import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from '../announcement/announcement';
import { AnnouncementService } from '../services/announcement.service';
import { Category } from '../announcement/category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})
export class EditAnnouncementComponent implements OnInit {
  announcement: Announcement;
  categories: Category[] = [];
  selectedCategory: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private announcementService: AnnouncementService,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.announcement = {id:'', title: '', author: '', description: '', categoryId: ''};
    this.route.params.subscribe(params => {
      const announcementId = params['id'].toString();
      this.announcementService.getAnnouncementById(announcementId).subscribe(
        (announcementData: Announcement) => {
          this.announcement = announcementData;
        },
        (error: any) => {
          console.error('Error fetching announcement:', error);
        }
      );
    });
  
    this.categoryService.getCategories().subscribe(
      (categoriesData: Category[]) => {
        this.categories = categoriesData;
        this.selectedCategory = this.announcement.categoryId;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSave(): void {
    this.announcement.categoryId = this.selectedCategory;
    this.announcementService.updateAnnouncement(this.announcement).subscribe();
    console.log('this.announcement', this.announcement);
    this.router.navigate(['/']);
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}

