import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  filteredPost = new ReplaySubject<string>();
  // postsUrlMock = 'https://645c9d6de01ac610588e2af3.mockapi.io/posts';
  postsUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostById(id: string) {
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }

  getPostsByTopic(topic: string) {
    return this.http.get<Post[]>(this.postsUrl, {
      params: new HttpParams().set('topic', topic),
    });
  }

  createPost(title: string, topic: string, content: string, picture: File): Observable<Post> {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('topic', topic);
    postData.append('content', content);
    postData.append('picture', picture, title);

    return this.http.post<Post>(this.postsUrl, postData);
  }

  editPost(id: string, title: string, topic: string, content: string, picture: File): Observable<Post> {
    const postData = new FormData();
    postData.append('_id', id);
    postData.append('title', title);
    postData.append('topic', topic);
    postData.append('content', content);
    if (picture) {
      postData.append('picture', picture, title);
    }

    // postData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    return this.http.put<Post>(this.postsUrl, postData);
  }
}
