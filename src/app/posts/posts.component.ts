import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { map, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts?: Post[];
  isFetching = false;
  error = null;
  currentPage = 0;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.getPosts().subscribe({
      next: (res: Post[]) => {
        this.isFetching = false;
        this.posts = res;
      },
      error: (error) => {
        this.error = error.message;
      },
    });

    this.postsService.filteredPost.subscribe((topic: string) => {
      this.isFetching = true;
      if (topic) {
        this.postsService.getPostsByTopic(topic).subscribe({
          next: (res: Post[]) => {
            this.isFetching = false;
            this.posts = res;
          },
          error: (error) => {
            this.error = error.message;
          },
        });
      } else {
        this.postsService.getPosts().subscribe({
          next: (res: Post[]) => {
            this.isFetching = false;
            this.posts = res;
          },
          error: (error) => {
            this.error = error.message;
          },
        });
      }
    });
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
  }
}
