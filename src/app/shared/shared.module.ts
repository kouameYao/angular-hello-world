import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/start-rating/start-rating.component';
import { ReplaceComma } from './pipe/replace-comma.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StarRatingComponent, ReplaceComma],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingComponent,
    ReplaceComma,
  ],
})
export class SharedModule {}
