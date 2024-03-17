import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-week-day-picker',
  templateUrl: './week-day-picker.component.html',
  styleUrls: ['./week-day-picker.component.css']
})
export class WeekDayPickerComponent {
  @Output() selectedDaysChange = new EventEmitter<string[]>();

  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedDays: string[] = [];

  toggleDay(day: string): void {
    const index = this.selectedDays.indexOf(day);

    if (index !== -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }

    this.selectedDaysChange.emit([...this.selectedDays]); // Emitir una copia del array
  }

  
}
