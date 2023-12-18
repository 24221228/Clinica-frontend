import { Observable } from 'rxjs';
import { Patient } from '../../domain/entities/patient.entity';

export abstract class PatientRepository {
  abstract create(patient: Patient): Observable<Patient>;
}
