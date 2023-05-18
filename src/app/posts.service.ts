import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  filteredPost = new ReplaySubject<string>();
  postsUrlMock = 'https://645c9d6de01ac610588e2af3.mockapi.io/posts';
  postsUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postsUrlMock);
  }

  getPostsByTopic(topic: string) {
    return this.http.get<Post[]>(this.postsUrlMock, {
      params: new HttpParams().set('topic', topic),
    });
  }

  createPost(title: string, topic: string, content: string, picture: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('topic', topic);
    postData.append('content', content);
    postData.append('picture', picture, title);

    this.http.post<Post>(this.postsUrl, postData).subscribe((postData) => {
      console.log(postData);
    });
  }
}
