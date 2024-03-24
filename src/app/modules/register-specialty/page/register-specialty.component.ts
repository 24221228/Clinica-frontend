import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateSpecialtyDto } from 'src/app/core/presentation/interfaces';
import { DisponibilidadHora } from 'src/app/core/presentation/interfaces/createSpecialtyDto';
import { SpecialtiesService } from 'src/app/core/presentation/services/especialidades/specialties.service';

@Component({
  selector: 'app-register-specialty',
  templateUrl: './register-specialty.component.html',
  styleUrls: ['./register-specialty.component.css']
})
export class RegisterSpecialtyComponent {
  selectedDays: string[] = [];
  registrarSpecialidadForm: FormGroup;
  disponibilidad_dias: string[] = [];
  disponibilidad_horas: DisponibilidadHora[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private specialtiesService: SpecialtiesService,
    private toastService: ToastrService){
      this.registrarSpecialidadForm = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        costo: ['', [Validators.required]],
        id_sede: ['', [Validators.required]],
        disponibilidad_dias: ['', [Validators.required]],
        disponibilidad_horas: ['', [Validators.required]]
      });
  }

  registrarEspecialidad():void{
    const {nombre, descripcion, costo, id_sede} = this.registrarSpecialidadForm.value;
    if (this.disponibilidad_dias.length == 0) {
      this.toastService.warning('Debes ingresar disponibilidad en dias');
      return;
    }
    if (this.disponibilidad_horas.length == 0) {
      this.toastService.warning('Debes ingresar disponibilidad en horas');
      return;
    }
    let especialidad: CreateSpecialtyDto = {
      nombre: nombre,
      descripcion: descripcion,
      costo: parseInt(costo),
      idSede: parseInt(id_sede),
      disponibilidad_dias: this.disponibilidad_dias,
      disponibilidad_horas: this.disponibilidad_horas
    }
    this.specialtiesService.createSpecialty(especialidad).subscribe({
      next: (_response: any) => {
        this.toastService.success('La especialidad se registro correctamente');
        setTimeout(() => {
          window.location.reload();
        }, 700)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  
  handleSelectedDaysChange(selectedDays: string[]): void {
    // Actualizar la disponibilidad de días
    this.disponibilidad_dias = selectedDays;
    // Filtrar las horas seleccionadas para los días seleccionados
    this.disponibilidad_horas = this.disponibilidad_horas.filter(hour => selectedDays.includes(hour.dia));
  }

  handleSelectedHoursChange(selectedHours: any): void {
    // Agregar la hora seleccionada a disponibilidad_horas
    this.disponibilidad_horas.push(selectedHours);
  }

  registrar(){
    console.log("length ->",this.disponibilidad_horas.length);
    console.log(this.disponibilidad_horas);
  }
}
