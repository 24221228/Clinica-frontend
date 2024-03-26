import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn } from './models/columna-tabla';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.css']
})
export class TablaDinamicaComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() detailSelected = new EventEmitter<any>();
  modalData: any;
  showModal = true;

  constructor() { }

  verDetalle(registro: any) {
    this.detailSelected.emit(registro);
    this.showModal = true; // Muestra el modal
  }
}
