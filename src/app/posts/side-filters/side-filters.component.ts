import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PostsService } from 'src/app/posts.service';
import { QueryRequest } from 'src/app/query-request.model';
@Component({
  selector: 'app-side-filters',
  templateUrl: './side-filters.component.html',
  styleUrls: ['./side-filters.component.css'],
})
export class SideFiltersComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  private inputSubject$ = new Subject<string>();

  filterForm!: FormGroup;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      rangeDateStart: new FormControl(null),
      rangeDateEnd: new FormControl(null),
      sort: new FormControl(null),
    });

    this.postsService.onClearFilterForm$.subscribe(() => {
      this.filterForm.reset();
    });

    fromEvent<Event>(this.searchInput.nativeElement, 'input').subscribe((event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      if (value.length >= 3 || value.length === 0) {
        this.inputSubject$.next(value);
      }
    });

    this.inputSubject$.pipe(debounceTime(1500), distinctUntilChanged()).subscribe((search: string) => {
      this.postsService.filteredPost$.next({ search });
    });
  }

  convertToIsoFormatDate(date: string) {
    const dateParts = date.split('/');
    const isoDateString = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
    const isoDate = new Date(isoDateString).toISOString();
    return isoDate;
  }

  onDateChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    let dateRange: QueryRequest = {
      datestart: '',
      dateend: '',
    };
    const dateStart = dateRangeStart.value;
    const dateEnd = dateRangeEnd.value;

    if (dateEnd && dateStart) {
      dateRange = {
        datestart: this.convertToIsoFormatDate(dateStart),
        dateend: this.convertToIsoFormatDate(dateEnd),
      };
    } else if (dateEnd) {
      dateRange = {
        dateend: this.convertToIsoFormatDate(dateEnd),
      };
    } else if (dateStart) {
      dateRange = {
        datestart: this.convertToIsoFormatDate(dateStart),
      };
    }

    this.postsService.filteredPost$.next(dateRange);
  }

  onSelect(event: MatSelectChange) {
    const value = event.value;
    this.postsService.filteredPost$.next({ sort: value });
  }
}
