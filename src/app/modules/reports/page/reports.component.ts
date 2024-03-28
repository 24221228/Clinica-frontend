import { Component, OnInit } from '@angular/core';
import { citas } from 'src/app/data/citas';
import { HeaderItem } from '../../records/models/header.item';
import { PersonasService } from 'src/app/core/presentation/services/personas/personas.service';
import { headerItems } from '../../records/page/header.items';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';
import { Observable, Subject, from } from 'rxjs';
import { Especialista } from 'src/app/core/presentation/interfaces/especialista';
import { EspecialistaService } from 'src/app/core/presentation/services/especialista/especialista.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  showTimeSelection: boolean = false;
  selectedRecordValue: string = '';
  citasData: any[] = citas;
  isRecordSelected: Boolean = false;
  registrationTitle: string = '';
  selectedItem: any; // Almacena el elemento seleccionado
  showModal = true; // Controla si se muestra o no el modal
  sortBy: string = 'id';
  sortOrder: string = 'asc';
  seleccionTiempoValue: string = '';
  registroTipoValue: string = '';
  headerItemsData: Record<string, HeaderItem[]> = {};
  recordsData: any[] = [];
  recordsData$: Observable<any>;
  headerItems: HeaderItem[] = [];
  modalData: any;
  selectedColumns: any[] = [];
  selectedData: any[] = [];

  private registroTipoSubject = new Subject<string>();

  constructor(
    private personsServices: PersonasService,
    private especialistaService: EspecialistaService
  ) {
    this.recordsData$ = new Observable();
  }

  ngOnInit(): void {
    this.headerItemsData = headerItems;
    this.personas();
  }
  
  /*selectRecord(){
    if(this.selectedRecordValue != ""){
      this.registrationTitle = this.selectedRecordValue
      this.isRecordSelected = true;
    }else{
      this.registrationTitle = "";
      this.isRecordSelected = false;
    }
  }*/

  verDetalle(cita: any){
    this.selectedItem = cita;
    this.showModal = true;
    console.log(cita)
    console.log(this.showModal)
  }
  
  seleccionTiempo(event: any) {
    this.seleccionTiempoValue = event.target.value;
  }

  sortData(key: string) {
    if (key === 'id' || key === 'name' || key === 'service') {
      if (this.sortBy === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = key;
        this.sortOrder = 'asc';
      }

      this.citasData.sort((a, b) => {
        const valueA = key === 'name' || key === 'service' ? a[key].toLowerCase() : a[key];
        const valueB = key === 'name' || key === 'service' ? b[key].toLowerCase() : b[key];

        if (this.sortOrder === 'asc') {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      });
    }
  }

  async seleccionRegistro(event: any) {
    this.selectedRecordValue = event.target.value;
  
    if (this.selectedRecordValue) {
      this.registrationTitle = `Registros de ${this.selectedRecordValue}`;
      this.isRecordSelected = true;
      switch (this.selectedRecordValue) {
        case 'usuarios':
          this.selectedColumns = [
            { id: 'id', name: 'ID' },
            { id: 'nombres', name: 'Nombres' },
            { id: 'apellidos', name: 'Apellidos' },
            { id: 'documento_numero', name: 'Número de documento'},
            { id: 'numero_telefono', name:'Número de telefono'},
            { id: 'direccion_completa', name: 'Dirección '},
          ];
          this.selectedData = await this.personas();
          break;
        case 'especialistas':
          this.selectedColumns = [
            { id: 'id', name: 'ID' },
            { id: 'nombres', name: 'Nombres' },
            { id: 'apellidos', name: 'Apellidos' },
            { id: 'documento_numero', name: 'Número de documento' },
            { id: 'telefono', name: 'Número de teléfono' },
            { id: 'direccion', name: 'Dirección' },
          ];
          this.selectedData = await this.especialistas();
          break;
          case 'pacientes':
            this.selectedColumns = [
              { id: 'id', name: 'ID' },
              { id: 'nombres', name: 'Nombres' },
              { id: 'apellidos', name: 'Apellidos' },
              { id: 'documento_numero', name: 'Número de documento'},
              { id: 'numero_telefono', name:'Número de telefono'},
              { id: 'direccion_completa', name: 'Dirección '},
            ];
            this.selectedData = await this.personas();
            break;
            case 'citas':
              this.selectedColumns = [
                { id: 'id', name: 'ID' },
                { id: 'nombres', name: 'Nombres' },
                { id: 'apellidos', name: 'Apellidos' },
                { id: 'documento_numero', name: 'Número de documento'},
                { id: 'numero_telefono', name:'Número de telefono'},
                { id: 'direccion_completa', name: 'Dirección '},
              ];
              this.selectedData = await this.personas();
              break;
        default:
          this.selectedColumns = [];
          this.selectedData = [];
          this.seleccionTiempoValue = "";
          break;
      }
    } else {
      this.registrationTitle = "";
      this.isRecordSelected = false;
      this.selectedColumns = [];
      this.selectedData = [];
      this.seleccionTiempoValue = "";
    }
  }
  

  async personas(): Promise<Person[]> {
    try {
      const persons = await from(this.personsServices.getAll()).toPromise();
      return persons as Person[];
    } catch (error) {
      console.error('Error al obtener personas:', error);
      throw error;
    }
  }

  async especialistas(): Promise<Especialista[]> {
    try {
      const especialistas = await from(this.especialistaService.getAll()).toPromise();
      return especialistas as Especialista[];
    } catch (error) {
      console.error('Error al obtener personas:', error);
      throw error;
    }
  }
}
