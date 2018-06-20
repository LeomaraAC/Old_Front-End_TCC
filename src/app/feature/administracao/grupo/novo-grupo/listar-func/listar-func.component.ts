import {
  Component,
  Inject,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatSort
} from '@angular/material';
import { PermissoesTelasDataSouce } from '../../../../../core/services/administracao/permissoesTelas.datasource';
import { PermissoesTelas } from '../../../../../model/grupos/allGroups.model';
import { merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ListaPermissoesSevices } from '../../../../../core/services/administracao/listaPermissoes.service';

@Component({
  selector: 'tcc-listar-func',
  templateUrl: './listar-func.component.html',
  styleUrls: ['./listar-func.component.css']
})
export class ListarFuncComponent implements OnInit, AfterViewInit {
  /* Declaração das variáveis */
  displayedColumns = ['select', 'funcao'];
  search = '';
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ListarFuncComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataSource: PermissoesTelasDataSouce,
    private fb: FormBuilder,
    public selection: ListaPermissoesSevices
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.loadFunction();
    // ******************************************************************
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.search = term;
        this.loadFunctionsPage();
      });

      // Inicializa os valores
    // this.selection.changeValue(this.data.inicial);
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadFunctionsPage())
      )
      .subscribe();
    /*************************************************************** */
  }

  loadFunctionsPage() {
    this.dataSource.loadFunction(
      this.search,
      this.sort.direction,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
