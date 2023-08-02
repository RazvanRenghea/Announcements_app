import { Component, Output, EventEmitter } from '@angular/core';
import { Category } from '../announcement/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();
  constructor(private categoryService: CategoryService) { }
  categories: Category[] = [];
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categoriesData: Category[]) => {
        this.categories = categoriesData;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  onCategoryClick(event: any, category: Category) {
    event.preventDefault();
    this.categorySelected.emit(category);
  }
}
