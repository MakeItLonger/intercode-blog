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

  onHome() {
    this.selectedItem = '';
    this.postsService.filteredPost.next('');
  }

  onPickTopic(event: MouseEvent) {
    let topic = (event.target as HTMLInputElement).outerText;

    switch (
      //delete after adding real backend
      topic
    ) {
      case 'Life style':
        topic = 'West';
        break;
      case 'Home':
        topic = 'East';
        break;
      case 'Hobby':
        topic = 'South';
        break;
      case 'Travel':
        topic = 'North';
        break;
      default:
        topic = '';
        break;
    }

    this.postsService.filteredPost.next(topic);
  }
}
