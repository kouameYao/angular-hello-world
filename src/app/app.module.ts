import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HotelListComponent } from './hotels-list/hotel-list.component';
import { StarRatingComponent } from './shared/components/start-rating/start-rating.component';
import { ReplaceComma } from './shared/pipe/replace-comma.pipe';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotels-list/hotel-detail/hotel-detail.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    ReplaceComma,
    StarRatingComponent,
    HomeComponent,
    HotelDetailComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
