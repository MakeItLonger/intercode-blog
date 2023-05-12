import { Component, HostListener } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menu: string[] = ['Life style', 'Home', 'Hobby', 'Travel'];
  selectedItem?: string;

  constructor(private postsService: PostsService) {}

  onSelect(item: string) {
    this.selectedItem = item;
  }
}
