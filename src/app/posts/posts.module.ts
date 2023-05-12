import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  exports: [MatCardModule, MatProgressSpinnerModule, MatInputModule],
})
export class PostsModule {}
