import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../domain/entities/patient.entity';
import { PatientRepository } from '../repositories/patient.repository';

@Injectable()
export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  execute(patient: Patient): Observable<Patient> {
    return this.patientRepository.create(patient);
  }
}
