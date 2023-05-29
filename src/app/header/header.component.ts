import { Component, OnInit } from '@angular/core';
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
    this.postsService.filteredPost$.next({
      search: '',
      topic: '',
      datestart: new Date(0).toISOString(),
      dateend: new Date().toISOString(),
      sort: 'title',
      page: '1',
      limit: '5',
    });
    this.postsService.onClearFilterForm$.next();
    this.selectedItem = '';
  }

  onPickTopic(event: MouseEvent) {
    let topic = (event.target as HTMLInputElement).outerText;

    this.postsService.filteredPost$.next({ topic });
  }
}
