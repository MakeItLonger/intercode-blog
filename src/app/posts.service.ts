import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { QueryRequest } from './query-request.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  filteredPost$ = new BehaviorSubject<QueryRequest>({
    search: '',
    topic: '',
    datestart: new Date(0).toISOString(),
    dateend: new Date().toISOString(),
    sort: 'title',
    page: '1',
    limit: '5',
  });
  onClearFilterForm$ = new Subject<void>();
  postsUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<{ posts: Post[]; total: number }>(this.postsUrl);
  }

  getPostsByQueryParams({
    search = '',
    topic = '',
    datestart = new Date(0).toISOString(),
    dateend = new Date().toISOString(),
    sort = 'title',
    page = '1',
    limit = '5',
  }: QueryRequest = {}) {
    const queryReqStr = `${this.postsUrl}?search=${search}&topic=${topic}&datestart=${datestart}&dateend=${dateend}&sort=${sort}&page=${page}&limit=${limit}`;

    return this.http.get<{ posts: Post[]; total: number }>(queryReqStr);
  }

  getPostById(id: string) {
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }

  createPost(title: string, topic: string, content: string, picture: File[]): Observable<Post> {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('topic', topic);
    postData.append('content', content);

    Array.from(picture).forEach((picture: File) => {
      postData.append('picture', picture, title);
    });

    return this.http.post<Post>(this.postsUrl, postData);
  }

  editPost(id: string, title: string, topic: string, content: string, picture: File[]): Observable<Post> {
    const postData = new FormData();
    postData.append('_id', id);
    postData.append('title', title);
    postData.append('topic', topic);
    postData.append('content', content);

    if (picture) {
      Array.from(picture).forEach((picture: File, index) => {
        postData.append('picture', picture, String(index));
      });
    }

    return this.http.put<Post>(this.postsUrl, postData);
  }
}
