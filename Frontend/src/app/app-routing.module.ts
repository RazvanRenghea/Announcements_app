import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddAnnouncementFormComponent } from './add-announcement-form/add-announcement-form.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { UnsavedChangesGuard } from './unsaved-changes-guard.service';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';

const routes:Routes = [{ path:'add-announcement', component:AddAnnouncementFormComponent, canDeactivate: [UnsavedChangesGuard] },{ path:'', component:HomeComponentComponent, pathMatch:'full'},{path:'edit/:id', component:EditAnnouncementComponent}, { path:'**',redirectTo:'empty-component', pathMatch:'full'},{ path:'empty-component', component:EmptyComponentComponent, pathMatch:'full'}];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
