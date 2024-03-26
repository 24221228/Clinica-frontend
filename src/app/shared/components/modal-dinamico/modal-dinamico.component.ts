import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-dinamico',
  templateUrl: './modal-dinamico.component.html',
  styleUrls: ['./modal-dinamico.component.css']
})
export class ModalDinamicoComponent {
  @Input() modalData: any;

  constructor() { }
}
