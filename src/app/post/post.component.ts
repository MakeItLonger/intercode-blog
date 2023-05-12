import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input('card') post!: Post;
  id?: number;

  onClick(): void {
    console.log(1);
  }

  ngOnInit(): void {
    this.id = Number(this.post?.id);
  }
}
