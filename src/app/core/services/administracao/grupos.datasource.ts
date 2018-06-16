import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { GrupoService } from './grupos.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Page, Group} from '../../../model/grupos/allGroups.model';
import {catchError, finalize} from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
// import {of} from 'rxjs/observable/of';

@Injectable()
export class GruposDataSouce implements DataSource<Group> {
  private groupSubject = new BehaviorSubject<Group[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public totalPage = new BehaviorSubject<number>(0);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private groupsService: GrupoService) {}

  connect(collectionViewer: CollectionViewer): Observable<Group[]> {
    return this.groupSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.groupSubject.complete();
    this.loadingSubject.complete();
  }

  loadGroup(filter = '', oreder = 'asc', pageIndex = 0, pageSize = 3) {
    this.loadingSubject.next(true);
    this.groupsService.getAllGroups(filter, pageIndex, pageSize, oreder).pipe(
      catchError((error) => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(page => {
      page = page as Page;
      this.totalPage.next(page.total);
      this.groupSubject.next(page.data);
    });
  }
}
