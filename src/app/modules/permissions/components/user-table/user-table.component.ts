import { Component, Input } from '@angular/core';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() dataPerson: Person[] | undefined;

  constructor(){}
}
