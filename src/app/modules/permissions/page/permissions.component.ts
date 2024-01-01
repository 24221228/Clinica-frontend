import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';
import { SearchPerson } from 'src/app/core/presentation/interfaces/searchPerson.interface';
import { PersonasService } from 'src/app/core/presentation/services/personas/personas.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit{
  activeTab = 'tab1';
  dataPersonTab1: Person[] = [];
  dataPersonTab2: Person[] = [];

  buscarUsuarioFormTab1: FormGroup;
  buscarUsuarioFormTab2: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private personsService: PersonasService,
    private toastService: ToastrService){
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

  async buscarUsuario(): Promise<void> {
    try {
      const formGroup = this.activeTab === 'tab1' ? this.buscarUsuarioFormTab1 : this.buscarUsuarioFormTab2;
      const { propiedadUsuarioSeleccionada, usuario } = formGroup.value;
      
      if (propiedadUsuarioSeleccionada === '') {
        this.toastService.warning('Debe seleccionar una propiedad válida');
      }else{
        const searchPersonDTO: SearchPerson = {
          [propiedadUsuarioSeleccionada]: propiedadUsuarioSeleccionada === 'id' ? parseInt(usuario, 10) : usuario,
          estatus: true
        };

        const data = await this.personsService.searchByProperty(propiedadUsuarioSeleccionada, searchPersonDTO)
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
  handleUserStatusUpdated(): void {
    // Actualizar la lista de personas
    this.buscarUsuario();
  }
  
}
