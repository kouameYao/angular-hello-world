import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/start-rating/start-rating.component';
import { ReplaceComma } from './pipe/replace-comma.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StarRatingComponent, ReplaceComma],
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, StarRatingComponent, ReplaceComma],
})
export class SharedModule {}
