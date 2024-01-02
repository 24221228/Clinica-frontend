import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  calendarOptions: any;
  ngOnInit(): void {
    this.calendarOptions = {
      editable: true, // Permite arrastrar eventos
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
    };
  }
  
  handleEventClick(event: any): void {
    // Lógica cuando se hace clic en un evento
    console.log('Evento clickeado:', event);
  }
}
