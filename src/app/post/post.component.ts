import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input('card') post!: Post;
  @HostListener('click') toFullPost() {
    this.router.navigate(['/post', this.id]);
  }
  id?: number | string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.id = this.post?._id;
  }
}
