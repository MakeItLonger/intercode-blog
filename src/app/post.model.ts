export interface Post {
  id?: number;
  title: string;
  content: string;
  topic: string;
  image: string;
  comments: string[];
  createdAt: Date;
}
