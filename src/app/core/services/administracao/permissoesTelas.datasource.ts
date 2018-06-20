import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Page, PermissoesTelas} from '../../../model/grupos/allGroups.model';
import {catchError, finalize} from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PermissoesTelasService } from './permissoesTelas.service';

@Injectable()
export class PermissoesTelasDataSouce implements DataSource<PermissoesTelas> {
  public functionSubject = new BehaviorSubject<PermissoesTelas[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public totalPage = new BehaviorSubject<number>(0);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private permissoesTelasService: PermissoesTelasService) {}

  connect(collectionViewer: CollectionViewer): Observable<PermissoesTelas[]> {
    return this.functionSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.functionSubject.complete();
    this.loadingSubject.complete();
  }

  loadFunction(filter = '', order = 'asc', pageIndex = 0, pageSize = 5) {
    this.loadingSubject.next(true);
    this.permissoesTelasService.getFunctions(filter, pageIndex, pageSize, order).pipe(
      catchError((error) => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(page => {
      page = page as Page;
      this.totalPage.next(page.total);
      this.functionSubject.next(page.data);
    });
  }
}
