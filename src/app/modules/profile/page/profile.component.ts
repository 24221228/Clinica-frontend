import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';
import { UpdatePerson } from 'src/app/core/presentation/interfaces/update.interface';
import { GlobalService } from 'src/app/core/presentation/services/global.service';
import { PersonasService } from 'src/app/core/presentation/services/personas/personas.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  personData: Person | undefined;
  userData: string = "";
  userName: string = ""
  updateProfileForm: FormGroup;
  private updateComplete = new Subject<void>();
  updateComplete$ = this.updateComplete.asObservable();
  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private personasService: PersonasService,
    private toastService: ToastrService){
    this.updateProfileForm = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      direccion_completa: [''],
      ciudad: [''],
      pais: [''],
      numero_telefono: [''],
    });
  }
  ngOnInit(): void {
    this.userData = this.globalService.getDataFromStorage<string>('correo_electronico') || "";
    this.personData = this.globalService.getDataFromStorage<Person[]>('person')?.[0];
    if(this.personData){
      const apellidoPaterno = this.personData.apellidos.split(' ');
      this.userName = "@"+this.personData.nombres.charAt(0) + apellidoPaterno[0];
    }
    
    this.updateProfileForm.patchValue({
      nombres: this.personData?.nombres || '',
      apellidos: this.personData?.apellidos || '',
      direccion_completa: this.personData?.direccion_completa || '',
      ciudad: this.personData?.ciudad || '',
      pais: this.personData?.pais || '',
      numero_telefono: this.personData?.numero_telefono || '',
    });
    this.updateComplete$.subscribe(() => {
      window.location.reload();
    });
  }

  updatePerson(){
    if (!this.isValidPersonData()) {
      console.error('No se puede actualizar la persona. El ID es nulo o indefinido.');
      return;
    }
    const updatePersonData: UpdatePerson = this.updateProfileForm.value;
    this.personasService.update(this.personData!.id, updatePersonData)
    .subscribe(
      (personaActualizada) => {
        this.updateFormWithNewData(personaActualizada);
        this.updateLocalStorage();
        this.toastService.success("El perfil se actualizo correctamente");
        this.updateComplete.next();
      },
      (_error) => {
        this.toastService.error("Error al actualizar el perfil");
      }
    );
  }
  
  private isValidPersonData(): boolean {
    return !!this.personData && this.personData.id !== undefined;
  }
  private updateFormWithNewData(personaActualizada: Person) {
    // Actualiza el formulario con los nuevos valores
    this.updateProfileForm.patchValue({
      nombres: personaActualizada.nombres,
      apellidos: personaActualizada.apellidos,
      direccion_completa: personaActualizada.direccion_completa,
      ciudad: personaActualizada.ciudad,
      pais: personaActualizada.pais,
      numero_telefono: personaActualizada.numero_telefono,
    });

    // También puedes volver a cargar los valores en el objeto personData
    this.personData = personaActualizada;
  }
  private updateLocalStorage(){
    this.globalService.removeDataStorage("USER_DATA");
    let userDataUpdate = {
      "id": this.globalService.getDataFromStorage<string>('id'),
      "correo_electronico": this.globalService.getDataFromStorage<string>('correo_electronico'),
      "contraseña": this.globalService.getDataFromStorage<string>('contraseña'),
      "roles": this.globalService.getDataFromStorage<string>('roles'),
      "token": this.globalService.getDataFromStorage<string>('token'),
      "person": [
        {
          "id": this.personData?.id,
          "nombres": this.personData?.nombres,
          "apellidos": this.personData?.apellidos,
          "genero": this.personData?.genero,
          "documento_tipo": this.personData?.documento_tipo,
          "documento_numero": this.personData?.documento_numero,
          "fecha_nacimiento": this.personData?.fecha_nacimiento,
          "direccion_completa": this.personData?.direccion_completa,
          "ciudad": this.personData?.ciudad,
          "pais": this.personData?.pais,
          "numero_telefono": this.personData?.numero_telefono
        }
      ]
    }
    const data = JSON.stringify(userDataUpdate);
    this.globalService.saveDataStorage("USER_DATA", data);
    window.location.reload();
  }
}
