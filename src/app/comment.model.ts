export interface Comment {
  _id?: string;
  postID: string;
  author: string;
  content: string;
  date?: Date;
}
