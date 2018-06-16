import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'tcc-novo-grupo',
  templateUrl: './novo-grupo.component.html',
  styleUrls: ['./novo-grupo.component.css']
})
export class NovoGrupoComponent implements OnInit {

  novoGrupo: FormGroup;
  style: boolean;
  constructor(private fb: FormBuilder, private media: ObservableMedia) { }

  ngOnInit() {
    this.media.subscribe((mediaChange: MediaChange) => this.toggleView());
    this.novoGrupo = this.fb.group({
      descricao: this.fb.control('', [Validators.required, Validators.minLength(4)])
    });
  }
  resetForm() {
    this.novoGrupo.reset();
  }

  submit() {
    console.log('Salvar grupo');
  }

  toggleView(): void {
    if (this.media.isActive('xs')) {
      this.style = false;
    } else {
     this.style = true;
    }
  }
}
