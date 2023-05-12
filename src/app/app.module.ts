import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { EditComponent } from './edit/edit.component';
import { FullpostComponent } from './fullpost/fullpost.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, HeaderComponent, EditComponent, FullpostComponent, PostsComponent, PostComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HeaderModule, HttpClientModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
