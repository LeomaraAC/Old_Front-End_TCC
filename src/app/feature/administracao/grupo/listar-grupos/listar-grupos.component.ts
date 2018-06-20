import { SearchService } from './../../../../core/services/administracao/search.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {GrupoService} from '../../../../core/services/administracao/grupos.service';
import { GruposDataSouce } from './../../../../core/services/administracao/grupos.datasource';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tcc-listar-grupos',
  templateUrl: './listar-grupos.component.html',
  styleUrls: ['./listar-grupos.component.css']
})
export class ListarGruposComponent implements OnInit, AfterViewInit {

  displayedColumns = ['Grupo'];
  search: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dataSource: GruposDataSouce,
              private searchService: SearchService) {}

  ngOnInit() {
    this.dataSource.loadGroup();
  }
  ngAfterViewInit() {
    this.searchService.search$.subscribe( filter => {
      this.search = filter;
      this.paginator.pageIndex = 0;
      this.loadGroupsPage();
    });
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      tap(() => this.loadGroupsPage())
    ).subscribe();
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  loadGroupsPage() {
    this.dataSource.loadGroup(this.search, this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize);
  }
}
