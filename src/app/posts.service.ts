import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  filteredPost = new ReplaySubject<string>();
  postsUrl = 'https://645c9d6de01ac610588e2af3.mockapi.io/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostsByTopic(topic: string) {
    return this.http.get<Post[]>(this.postsUrl, {
      params: new HttpParams().set('topic', topic),
    });
  }
}
