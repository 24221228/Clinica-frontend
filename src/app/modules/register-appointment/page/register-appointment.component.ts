import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { especialidades } from 'src/app/data/especialidades';
import { pacientes } from 'src/app/data/pacientes';

@Component({
  selector: 'app-register-appointment',
  templateUrl: './register-appointment.component.html',
  styleUrls: ['./register-appointment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterAppointmentComponent implements OnInit{
  showModal = false; // Controla si se muestra o no el modal
  horas: string[] = [];
  //horaSeleccionada: string = ''
  //horaSeleccionada$: Subject<string> = new Subject<string>();
  horaSeleccionada: Observable<string>;
  horaSeleccionadaSubject: Subject<string> = new Subject<string>();
  pacientes: string[] = []
  filaSeleccionada: number = -1;
  pacienteSeleccionado: any;;
  especialidadesData = especialidades;
  especialidadSeleccionada: string | null = null;
  especialidadCita: any;
  especialistasSeleccionados: any[] = [];
  pacienteData = pacientes;
  pacientesFiltrados: any[] = [];
  propiedadSeleccionada: keyof typeof pacientes[0] = 'name';
  valorBusqueda: string = '';
  especialistaSeleccionado: string = 'Seleccionar';
  especialista: any;
  fechaCita: Date = new Date()

  constructor(private cdr: ChangeDetectorRef){
    this.generarHoras();
    this.horaSeleccionada = of('')
  }
  ngOnInit(): void {
    this.horaSeleccionada = this.horaSeleccionadaSubject.asObservable();
  }

  buscarPacientes(): void {
    const valor = this.valorBusqueda.toLowerCase();
    
    this.pacientesFiltrados = this.pacienteData.filter(paciente =>
      this.compararPropiedad(paciente[this.propiedadSeleccionada], valor)
    );
  }

  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.cdr.detectChanges();
    console.log('Datos de paciente seleccionado:', paciente);
  }

  compararPropiedad(propiedad: string | number, valor: string): boolean {
    if (this.propiedadSeleccionada === 'idUsuario' && typeof propiedad === 'number') {
      return propiedad === +valor;  // Convierte el valor a número y compara estrictamente
    } else if (typeof propiedad === 'string') {
      return propiedad.toLowerCase().includes(valor);
    } else if (typeof propiedad === 'number') {
      return propiedad.toString().includes(valor);
    }
    return false;
  }

  verDetalle(){
    this.especialista = this.especialidadCita?.especialistas.find((e: any) => e.id === this.especialistaSeleccionado);
    this.showModal = true;
  }

  fechaSeleccionada(fecha: Date) {
    this.fechaCita = fecha;
  }

  cambiarEspecialidad() {
    this.especialidadCita = especialidades.find(e => e.id === this.especialidadSeleccionada);
    console.log(this.especialidadCita)
    this.especialistasSeleccionados = this.especialidadCita?.especialistas || [];
  }

  seleccionarFila(index: number) {
    this.filaSeleccionada = index;
    this.cdr.detectChanges();
    this.horaSeleccionadaSubject.next(this.horas[index]);
  }

  generarHoras() {
    const horaInicio = 8;
    const horaFin = 17;
    const intervaloMinutos = 15;

    for (let hora = horaInicio; hora <= horaFin; hora++) {
      for (let minuto = 0; minuto < 60; minuto += intervaloMinutos) {
        const horaFormateada = this.formatearHora(hora, minuto);
        this.horas.push(horaFormateada);
      }
    }
  }

  formatearHora(hora: number, minuto: number): string {
    const amPm = hora < 12 ? 'AM' : 'PM';
    const hora12 = hora > 12 ? hora - 12 : hora;
    const horaFormateada = `${this.dosDigitos(hora12)}:${this.dosDigitos(minuto)} ${amPm}`;

    return horaFormateada;
  }

  dosDigitos(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }
}
