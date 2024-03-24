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
  selectedRecordValue: string = '';
  citasData: any[] = citas;
  isRecordSelected: Boolean = false;
  registrationTitle: string = '';
  selectedItem: any; // Almacena el elemento seleccionado
  showModal = false; // Controla si se muestra o no el modal
  sortBy: string = 'id';
  sortOrder: string = 'asc';
  seleccionTiempoValue: string = '';
  registroTipoValue: string = '';
  headerItemsData: Record<string, HeaderItem[]> = {};
  recordsData: any[] = [];
  recordsData$: Observable<any>;
  headerItems: HeaderItem[] = [];

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
    this.registroTipoValue = event.target.value;
    if (this.registroTipoValue) {
      this.registrationTitle = `Registros de ${this.registroTipoValue}`;
      this.isRecordSelected = true;
      switch (this.registroTipoValue) {
        case 'usuarios':
          this.recordsData = await this.personas();
          break;
        case 'especialistas':
          this.recordsData = await this.especialistas();
          break;
        default:
          this.recordsData = [];
          break;
      }
    } else {
      this.registrationTitle = "";
      this.isRecordSelected = false;
      this.recordsData = [];
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
