import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { PageEvent } from '@angular/material/paginator';
import { QueryRequest } from '../query-request.model';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts?: Post[];
  isFetching = false;
  error = null;
  currentPage = 0;
  total?: number;

  filteredPostSubscription!: Subscription;

  queryParams: QueryRequest = {};

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;

    this.filteredPostSubscription = this.postsService.filteredPost$.subscribe((queryRequest: QueryRequest) => {
      this.isFetching = true;
      Object.assign(this.queryParams, queryRequest);
      this.makeQueryRequest(this.queryParams);
    });
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.queryParams.page = String(this.currentPage + 1);
    this.queryParams.limit = String(pageEvent.pageSize);

    this.makeQueryRequest(this.queryParams);
  }

  makeQueryRequest(queryParams: QueryRequest) {
    this.postsService.getPostsByQueryParams(queryParams).subscribe((res) => {
      this.isFetching = false;
      this.posts = res.posts;
      this.total = res.total;
    });
  }

  ngOnDestroy() {
    this.filteredPostSubscription.unsubscribe();
  }
}
