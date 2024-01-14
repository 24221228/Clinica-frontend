import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  calendar: Date[][] = [];
  selectedDate: Date = new Date();
  formattedSelectedDate: string = '';
  @Output() dateSelected = new EventEmitter<Date>();

  constructor(){
    this.generateCalendar(new Date());
  }
  ngOnInit(): void {
  }

  generateCalendar(date: Date): void {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const currentDate = new Date(startOfMonth);
    const weeks: Date[][] = [];

    while (currentDate <= endOfMonth) {
      const week: Date[] = [];

      for (let i = 0; i < 7; i++) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      weeks.push(week);
    }

    this.calendar = weeks;
  }

  isSelected(date: Date): boolean {
    return this.selectedDate && date.toDateString() === this.selectedDate.toDateString();
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    //this.dateSelected.emit(this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  goToPreviousMonth(): void {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1, 1);
    this.generateCalendar(this.selectedDate);
  }

  goToNextMonth(): void {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 1);
    this.generateCalendar(this.selectedDate);
  }

}
