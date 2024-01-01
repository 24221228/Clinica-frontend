import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';
import { SearchPerson } from 'src/app/core/presentation/interfaces/searchPerson.interface';
import { PersonasService } from 'src/app/core/presentation/services/personas/personas.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit{
  activeTab = 'tab1';
  dataPersonTab1: Person[] = [];
  dataPersonTab2: Person[] = [];

  buscarUsuarioFormTab1: FormGroup;
  buscarUsuarioFormTab2: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personasService: PersonasService,
    private toastService: ToastrService
  ){
    this.buscarUsuarioFormTab1 = this.formBuilder.group({
      propiedadUsuarioSeleccionada: ['', [Validators.required]],
      usuario: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.buscarUsuarioFormTab2 = this.formBuilder.group({
      propiedadUsuarioSeleccionada: ['', [Validators.required]],
      usuario: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  ngOnInit(): void {
    this.activeTab = 'tab1';
  }

  async buscarUsuario(estatus: boolean): Promise<void> {
    try {
      const formGroup = this.activeTab === 'tab1' ? this.buscarUsuarioFormTab1 : this.buscarUsuarioFormTab2;
      const { propiedadUsuarioSeleccionada, usuario } = formGroup.value;

      if (propiedadUsuarioSeleccionada === '') {
        this.toastService.warning('Debe seleccionar una propiedad válida');
      } else {
        const searchPersonDTO: SearchPerson = {
          [propiedadUsuarioSeleccionada]: propiedadUsuarioSeleccionada === 'id' ? parseInt(usuario, 10) : usuario,
          estatus
        };

        const data = await this.personasService.searchByProperty(propiedadUsuarioSeleccionada, searchPersonDTO)
          .pipe(
            catchError((_error: any) => {
              return of([]);
            })
          )
          .toPromise();
        
        if(data?.length == 0){
          this.toastService.error('Usuario no encontrado');
        }

        if (this.activeTab === 'tab1') {
          this.dataPersonTab1 = data || [];
        } else {
          this.dataPersonTab2 = data || [];
        }
      }
    } catch (error) {
      throw error;
    }
  }

  // Manejar el evento userStatusUpdated
  handleUserStatusUpdated(status: boolean): void {
    // Actualizar la lista de personas
    this.buscarUsuario(status);
  }
  
}
