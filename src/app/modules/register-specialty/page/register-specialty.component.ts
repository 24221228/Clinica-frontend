import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { CreateSpecialtyDto } from 'src/app/core/presentation/interfaces';
import { SpecialtiesService } from 'src/app/core/presentation/services/especialidades/specialties.service';

@Component({
  selector: 'app-register-specialty',
  templateUrl: './register-specialty.component.html',
  styleUrls: ['./register-specialty.component.css']
})
export class RegisterSpecialtyComponent {
  selectedDays: string[] = [];
  registrarSpecialidadForm: FormGroup;
  disponibilidad_dias: string[] = []
  disponibilidad_horas: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private specialtiesService: SpecialtiesService){
      this.registrarSpecialidadForm = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        costo: ['', [Validators.required]],
        sede: ['', [Validators.required]],
        disponibilidad_dias: ['', [Validators.required]],
        disponibilidad_horas: ['', [Validators.required]]
      });
  }

  registrarEspecialidad():void{
    const {nombre, descripcion, costo, sede} = this.registrarSpecialidadForm.value;
    let especialidad: CreateSpecialtyDto = {
      nombre: nombre,
      descripcion: descripcion,
      costo: costo,
      disponibilidad_dias: this.disponibilidad_dias,
      disponibilidad_horas: this.disponibilidad_horas
    }
    console.log("especialidad ->",especialidad)
    /*this.specialtiesService.createSpecialty(especialidad).subscribe({
      next: (user: any) => {
        timer(1500).subscribe(() => {
          this.router.navigate(['dashboard']);
        });
      },
      error: (error: any) => {
        switch (error.status) {
          case 400:
            console.log('Error al iniciar sesión (400)', error.error.message[0]);
            return error.error.message[0];//Bad Request
        
          case 401:
            console.log('Error al iniciar sesión (401)', error.error.message);
            return error.error.message;//Unauthorized
        }
        
        return error;
      }
    })*/
  }
  
  handleSelectedDaysChange(selectedDays: string[]): void {
    this.disponibilidad_dias = selectedDays;
  }
  handleSelectedHoursChange(selectedHours: { start: string; end: string }): void {
    this.disponibilidad_horas = [selectedHours.start, selectedHours.end];
  }
}
