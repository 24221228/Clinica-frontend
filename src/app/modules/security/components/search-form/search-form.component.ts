import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Input() buscarUsuarioForm: FormGroup;
  @Output() search = new EventEmitter<boolean>();
  dataPerson: Person[] | undefined;

  constructor(
    private formBuilder: FormBuilder) {
    this.buscarUsuarioForm = this.formBuilder.group({
      propiedadUsuarioSeleccionada: ['', [Validators.required]],
      usuario: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
