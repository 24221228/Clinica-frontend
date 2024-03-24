import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-hour-range-picker',
  templateUrl: './hour-range-picker.component.html',
  styleUrls: ['./hour-range-picker.component.css']
})
export class HourRangePickerComponent implements OnChanges {
  @Output() selectedHoursChange: EventEmitter<{ dia: string; start: string; end: string }> = new EventEmitter();
  @Input() dias: string[] = []
  selectedHours: { [key: string]: { start: string; end: string } } = {};
  hoursOfDay: string[] = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  ngOnChanges(): void {
  }

  selectHour(hour: string, type: 'start' | 'end', dia: string): void {
    if (!this.selectedHours[dia]) {
      this.selectedHours[dia] = { start: '', end: '' };
    }
    if (type === 'start') {
      this.selectedHours[dia].start = hour;
    } else {
      this.selectedHours[dia].end = hour;
    }
    if (!this.selectedHours[dia].start || !this.selectedHours[dia].end) {
      return;
    }
    
    this.selectedHoursChange.emit({ dia, start: this.selectedHours[dia].start, end: this.selectedHours[dia].end });
  }
}
