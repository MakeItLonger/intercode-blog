import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  filteredPost = new ReplaySubject();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>('https://645c9d6de01ac610588e2af3.mockapi.io/posts');
  }
}
