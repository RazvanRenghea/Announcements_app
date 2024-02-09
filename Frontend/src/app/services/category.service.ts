import { Injectable } from '@angular/core';
import { Category } from '../announcement/category';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL="https://newsapi20221108120432.azurewebsites.net/api/Categories";
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL);
  }
  getCategoryById(id: string): Observable<Category> {
    const url = `${this.baseURL}/api/Categories/${id}`;
    return this.http.get<Category>(url);
  }
}
