import { Component, Output, EventEmitter } from '@angular/core';
import { Category } from '../announcement/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();
  categories: Category[] = [{ id:1, name: 'Course' }, { id:2, name: 'General' }, { id:3, name: 'Laboratory' }, { id:4, name: 'All' }];
  onCategoryClick(event: any, category: Category) {
    event.preventDefault();
    this.categorySelected.emit(category);
  }
}
