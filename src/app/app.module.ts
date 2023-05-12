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

@NgModule({
  declarations: [AppComponent, HeaderComponent, EditComponent, FullpostComponent, PostsComponent, PostComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HeaderModule, HttpClientModule, PostsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
