import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root',
})
export class HotelEditGuard implements CanDeactivate<unknown> {
  canDeactivate(component: HotelEditComponent): boolean {
    if (component.hotelForm.dirty) {
      const hotelName =
        component.hotelForm.get('hotelName')?.value || 'Nouveau hotel';
      return confirm(
        `Voulez-vous annuler les changement effectués sur ${hotelName} ?`
      );
    }
    return true;
  }
}
