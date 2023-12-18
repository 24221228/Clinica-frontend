import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, from, of } from 'rxjs';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';
import { SearchPerson } from 'src/app/core/presentation/interfaces/searchPerson.interface';
import { PersonasService } from 'src/app/core/presentation/services/personas/personas.service';
import { UsersService } from 'src/app/core/presentation/services/users/users.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit{
  buscarUsuarioForm: FormGroup;
  activeTab = 'tab1';
  dataPerson: Person[] | undefined;
  errorMessage: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private personsService: PersonasService,
    private toastService: ToastrService){
    this.buscarUsuarioForm = this.formBuilder.group({
      propiedadUsuarioSeleccionada: ['', [Validators.required]],
      usuario: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.dataPerson = [];
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  ngOnInit(): void {
    this.activeTab = 'tab1';
  }

  async buscarUsuario(): Promise<Person[]> {
    try {
      const { propiedadUsuarioSeleccionada, usuario } = this.buscarUsuarioForm.value;
  
      const searchPersonDTO: SearchPerson = {
        [propiedadUsuarioSeleccionada]: propiedadUsuarioSeleccionada === 'id' ? parseInt(usuario, 10) : usuario
      };
  
      this.dataPerson = await this.personsService.searchByProperty(propiedadUsuarioSeleccionada, searchPersonDTO)
        .pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && error.error && error.error.message) {
              this.toastService.error("Usuario no encontrado");
            } else {
              this.errorMessage = 'Error al obtener el usuario. Por favor, inténtelo de nuevo.';
            }
            // Retornar un array vacío en caso de error para evitar problemas de tipo
            return of([]);
          })
        )
        .toPromise();
      return this.dataPerson || [];
    } catch (error) {
      throw error;
    }
  }
  
}
