import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Output() commentEdited = new EventEmitter<string>();
  @Output() commentDeleted = new EventEmitter<string>();
  @Input() comment!: Comment;

  onClickEditButton() {
    this.commentEdited.emit(this.comment._id);
  }

  onClickDeleteButton() {
    this.commentDeleted.emit(this.comment._id);
  }
}
