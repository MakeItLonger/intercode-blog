import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isVisible$ = new BehaviorSubject<boolean>(true);
  constructor() {}

  get isVisibleObs$() {
    return this.isVisible$.asObservable();
  }
}
