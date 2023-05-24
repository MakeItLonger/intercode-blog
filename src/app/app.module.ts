import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './header/header.module';
import { PostsModule } from './posts/posts.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditComponent } from './edit/edit.component';
import { FullpostComponent } from './fullpost/fullpost.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { DragDropFileDirective } from './drag-drop-file.directive';
import { PictureSliderComponent } from './fullpost/picture-slider/picture-slider.component';
import { SideFiltersComponent } from './posts/side-filters/side-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditComponent,
    FullpostComponent,
    PostsComponent,
    PostComponent,
    DragDropFileDirective,
    PictureSliderComponent,
    SideFiltersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HeaderModule, HttpClientModule, PostsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
