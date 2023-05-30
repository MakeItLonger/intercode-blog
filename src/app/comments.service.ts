import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  loadedComments: BehaviorSubject<string> = new BehaviorSubject<string>('Initial Value');

  commentsUrl = 'http://localhost:5000/api/comments';
  constructor(private http: HttpClient) {}

  createComment(author: string, content: string, postID: string): Observable<Comment> {
    const commentData = { author, content, postID };

    return this.http.post<Comment>(this.commentsUrl, commentData);
  }

  getComments(postID: string) {
    return this.http.get<Comment[]>(`${this.commentsUrl}/${postID}`);
  }

  getCommentById(id: string) {
    return this.http.get<Comment>(`${this.commentsUrl}/comment/${id}`);
  }

  updateComment(author: string, content: string, _id?: string): Observable<Comment> {
    const commentData = { author, content, _id };

    return this.http.put<Comment>(this.commentsUrl, commentData);
  }

  deleteComment(id?: string): Observable<Comment> {
    return this.http.delete<Comment>(`${this.commentsUrl}/comment/${id}`);
  }
}
