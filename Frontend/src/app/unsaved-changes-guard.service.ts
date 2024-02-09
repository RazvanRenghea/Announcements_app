import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AddAnnouncementFormComponent } from './add-announcement-form/add-announcement-form.component';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<AddAnnouncementFormComponent> {
  canDeactivate(component: AddAnnouncementFormComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Do you want to discard them?');
    }
    return true;
  }
}
