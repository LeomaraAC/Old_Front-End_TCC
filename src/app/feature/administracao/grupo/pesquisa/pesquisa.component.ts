import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { SearchService } from './../../../../core/services/administracao/search.service';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tcc-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  searchForm: FormGroup;
  searchControl: FormControl;
  style: boolean;
  @Output() buscar = new EventEmitter<string>();
  constructor(private media: ObservableMedia, private searchService: SearchService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });
    this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(term => this.searchService.filter(term));
    this.media.subscribe((mediaChange: MediaChange) => this.toggleView());
  }

  toggleView(): void {
    if (this.media.isActive('xs')) {
      this.style = false;
    } else {
     this.style = true;
    }
  }

}
