import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { PermissoesTelas } from './../../../../model/grupos/allGroups.model';
import { ListarFuncComponent } from './listar-func/listar-func.component';
import { ListaPermissoesSevices } from '../../../../core/services/administracao/listaPermissoes.service';

@Component({
  selector: 'tcc-novo-grupo',
  templateUrl: './novo-grupo.component.html',
  styleUrls: ['./novo-grupo.component.css']
})
export class NovoGrupoComponent implements OnInit {
  /* Declaração das variáveis */
  novoGrupo: FormGroup;
  style: boolean;
  dataSource = new MatTableDataSource<PermissoesTelas>();
  displayedColumns =  ['remover', 'funcao'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private media: ObservableMedia,
    public dialog: MatDialog,
    private funcoesSelected: ListaPermissoesSevices
  ) {}

  ngOnInit() {
    this.media.subscribe((mediaChange: MediaChange) => this.toggleView());

    this.novoGrupo = this.fb.group({
      descricao: this.fb.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(60)
      ])
    });

  }
  resetForm() {
    this.novoGrupo.reset();
  }

  submit() {
    console.log('Salvar grupo');
  }

  adicionar() {
    const dialogRef = this.dialog.open(ListarFuncComponent, {
      width: '550px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.dataSource.data = this.funcoesSelected.getItens;
        this.dataSource.paginator = this.paginator;
      });

  }

  toggleView(): void {
    if (this.media.isActive('xs')) {
      this.style = false;
    } else {
      this.style = true;
    }
  }

  /* Função para remover */
  remove (element) {
    this.funcoesSelected.removeValue(element);
    this.dataSource.data = this.funcoesSelected.getItens;
  }
}
