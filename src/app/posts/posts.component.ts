import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { PageEvent } from '@angular/material/paginator';
import { QueryRequest } from '../query-request.model';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts?: Post[];
  isFetching = false;
  error = null;
  currentPage = 0;
  total?: number;

  queryParams: QueryRequest = {};

  posts$ = this.postsService.filteredPost$.pipe(
    tap((queryRequest) => {
      Object.assign(this.queryParams, queryRequest);
    }),
    switchMap(() => {
      return this.postsService.getPostsByQueryParams(this.queryParams);
    }),
    tap((res) => {
      this.total = res.total;
    }),
    map((response) => {
      return response.posts;
    }),
  );

  constructor(private postsService: PostsService) {}

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;

    const page = String(this.currentPage + 1);
    const limit = String(pageEvent.pageSize);

    this.postsService.filteredPost$.next({ page, limit });
  }
}
