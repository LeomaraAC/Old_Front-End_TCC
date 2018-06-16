import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  private search = new BehaviorSubject<string>('');
  search$ = this.search.asObservable();
  filter(term: string) {
    this.search.next(term);
  }
}
