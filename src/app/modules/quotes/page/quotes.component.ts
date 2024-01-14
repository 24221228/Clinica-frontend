import { Component } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  citas = [
    { id: 1, fecha: '2024-01-01', hora: '10:00 AM', paciente: 'John Doe', especialidad: 'Ginecología' },
    { id: 2, fecha: '2024-01-05', hora: '02:30 PM', paciente: 'Jane Doe', especialidad: 'Neonatología' },
  ];
  especialidades = ['Neonatología', 'Ginecología'];
  fechaSeleccionada: Date | null = null;
  citasFiltradas: any[] = [];

  actualizarCitasMedicas(fechaSeleccionada: Date): void {
    this.fechaSeleccionada = fechaSeleccionada;

    // Filtrar citas basadas en la fecha seleccionada
    this.citasFiltradas = this.citas.filter(cita => cita.fecha === fechaSeleccionada.toISOString().slice(0, 10));
  }

  verDetalle(cita: any): void {
    console.log('Detalle de la cita:', cita);
  }
}
