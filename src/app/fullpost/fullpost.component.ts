import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { BehaviorSubject, switchMap } from 'rxjs';
import { SlideInterface } from './picture-slider/slide.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.css'],
})
export class FullpostComponent implements OnInit {
  id!: string;
  post!: Post;
  slides: SlideInterface[] = [];

  editMode: boolean = false;
  commentID?: string;

  comments$ = this.commentsService.loadedComments.pipe(
    switchMap(() => {
      return this.commentsService.getComments(this.id);
    }),
  );

  creationCommentForm!: FormGroup;

  isFetching$ = new BehaviorSubject<boolean>(true);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    this.headerService.isVisible$.next(false);

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

    this.creationCommentForm = new FormGroup({
      author: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }
  routeToEditMode() {
    this.router.navigate(['/edit', this.id]);
  }

  onCreateComment() {
    if (!this.editMode) {
      this.commentsService
        .createComment(this.creationCommentForm.value.author, this.creationCommentForm.value.content, this.id)
        .subscribe(() => {
          this.commentsService.loadedComments.next('New comment!');
          this.creationCommentForm.reset();
          this.creationCommentForm.markAsUntouched();
          this.creationCommentForm.controls['author'].setErrors(null);
          this.creationCommentForm.controls['content'].setErrors(null);
        });
    } else {
      this.commentsService
        .updateComment(this.creationCommentForm.value.author, this.creationCommentForm.value.content, this.commentID)
        .subscribe(() => {
          this.commentsService.loadedComments.next('Updated comment!');
          this.creationCommentForm.reset();
          this.creationCommentForm.markAsUntouched();
          this.creationCommentForm.controls['author'].setErrors(null);
          this.creationCommentForm.controls['content'].setErrors(null);
          this.editMode = false;
        });
    }
  }

  onEditComment(id: string) {
    this.editMode = true;
    this.commentID = id;
    this.commentsService.getCommentById(this.commentID).subscribe((comment) => {
      this.creationCommentForm.patchValue({
        author: comment.author,
        content: comment.content,
      });
    });
  }

  onDeleteComment(id: string) {
    this.commentID = id;
    this.commentsService.deleteComment(this.commentID).subscribe(() => {
      this.commentsService.loadedComments.next('Delete comment!');
    });
  }
}
