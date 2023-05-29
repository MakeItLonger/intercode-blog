import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SlideInterface } from './picture-slider/slide.interface';

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
