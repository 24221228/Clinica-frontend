import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.css']
})
export class TablaDinamicaComponent {
  @Input() headerItems: any[] = [];
  @Input() recordsData: any[] = [];
  @Output() detalleSeleccionado = new EventEmitter<any>();

  constructor() { }

  verDetalle(registro: any) {
    this.detalleSeleccionado.emit(registro);
  }
}
