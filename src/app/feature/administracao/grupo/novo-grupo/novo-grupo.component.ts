import { GrupoService } from './../../../../core/services/administracao/grupos.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { PermissoesTelas } from './../../../../model/grupos/allGroups.model';
import { ListarFuncComponent } from './listar-func/listar-func.component';
import { ListaPermissoesSevices } from '../../../../core/services/administracao/listaPermissoes.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Router } from '@angular/router';

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
  @ViewChild('nomeGrupo') nomeGrupoRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private media: ObservableMedia,
    public dialog: MatDialog,
    private funcoesSelected: ListaPermissoesSevices,
    private service: GrupoService,
    private notificationService: NotificationService,
    private router: Router
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
    this.funcoesSelected.clear();
    this.updateItens();
    this.novoGrupo.reset();
    this.nomeGrupoRef.nativeElement.focus();
  }

  submit() {
    const valueForm = this.novoGrupo.value;
    const qtde = this.funcoesSelected.quantityItems();
    if (this.novoGrupo.valid && (qtde > 0)) {
      this.service.createGroup(valueForm.descricao, this.funcoesSelected).subscribe(response => {
        this.notificationService.notifySnackbar(response['message'], false);
        this.funcoesSelected.clear();
        this.router.navigate(['/grupos']);
      });
    }
  }

  adicionar() {
    const dialogRef = this.dialog.open(ListarFuncComponent, {
      width: '550px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.updateItens();
      });

  }
  updateItens() {
    this.dataSource.data = this.funcoesSelected.getItens;
    this.dataSource.paginator = this.paginator;
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
