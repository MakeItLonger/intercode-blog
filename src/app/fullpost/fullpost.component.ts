import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SlideInterface } from './picture-slider/slide.interface';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.css'],
})
export class FullpostComponent implements OnInit {
  id!: string;
  post!: Post;
  slides: SlideInterface[] = [];

  isFetching$ = new BehaviorSubject<boolean>(true);

  comments: Comment[] = [
    {
      author: 'John',
      content: 'Great article!',
      timestamp: new Date('2023-05-25T09:30:00'),
    },
    {
      author: 'Jane',
      content: 'Thanks for sharing.',
      timestamp: new Date('2023-05-25T10:15:00'),
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.postsService.getPostById(this.id).subscribe({
      next: (postAPI) => {
        this.post = postAPI;
        Array.from(this.post.picture).forEach((picture, index) => {
          this.slides.push({
            title: String(index),
            url: picture,
          });
        });
      },
      complete: () => {
        this.isFetching$.next(false);
      },
    });
  }
  routeToEditMode() {
    this.router.navigate(['/edit', this.id]);
  }
}
