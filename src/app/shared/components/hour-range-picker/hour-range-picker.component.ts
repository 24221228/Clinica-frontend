import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hour-range-picker',
  templateUrl: './hour-range-picker.component.html',
  styleUrls: ['./hour-range-picker.component.css']
})
export class HourRangePickerComponent {
  selectedHours: { start: string; end: string } = { start: '', end: '' };

  @Output() selectedHoursChange: EventEmitter<{ start: string; end: string }> = new EventEmitter();

  hoursOfDay: string[] = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  selectHour(hour: string, type: 'start' | 'end'): void {
    // Actualizar el objeto selectedHours según sea necesario.
    if (type === 'start') {
      this.selectedHours.start = hour;
    } else {
      this.selectedHours.end = hour;
    }

    // Emitir el evento con el objeto actualizado.
    this.selectedHoursChange.emit(this.selectedHours);
  }
}
