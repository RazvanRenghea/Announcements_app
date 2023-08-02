import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CategoriesComponent } from './categories/categories.component';
import {MatButtonModule} from '@angular/material/button';
import { ByAuthorPipe } from './by-author.pipe';
import { AddAnnouncementFormComponent } from './add-announcement-form/add-announcement-form.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AppRoutingModule } from './app-routing.module';
import { UnsavedChangesGuard } from './unsaved-changes-guard.service';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AnnouncementComponent,
    CategoriesComponent,
    ByAuthorPipe,
    AddAnnouncementFormComponent,
    HomeComponentComponent,
    EmptyComponentComponent,
    EditAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UnsavedChangesGuard, HubConnectionBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
