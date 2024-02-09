import { Injectable } from '@angular/core';
import { Announcement } from '../announcement/announcement';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  baseURL="http://localhost:7071/Announcement";
  constructor(private http: HttpClient) { }
  serviceCall() {
    console.log('Service was called');
   }
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.baseURL);
  }
  addAnnouncement(newAnnouncement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.baseURL, newAnnouncement);
  }
  deleteAnnouncementById(id: string): Observable<any> {
    const deleteUrl = `${this.baseURL}/${id}`;
    return this.http.delete(deleteUrl);
  }
  
  getAnnouncementById(id: string): Observable<Announcement> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Announcement>(url);
  }
  updateAnnouncement(announcement: Announcement): Observable<any> {
    const url = `${this.baseURL}/${announcement.id}`;
    return this.http.put(url, announcement);
  }  
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

}
