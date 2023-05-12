import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts?: Post[];
  isFetching = false;
  error = null;
  //filteredState = false;

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
      this.postsService.getPostsByTopic(topic).subscribe({
        next: (res: Post[]) => {
          this.isFetching = false;
          this.posts = res;
        },
        error: (error) => {
          this.error = error.message;
        },
      });
    });
  }
}
