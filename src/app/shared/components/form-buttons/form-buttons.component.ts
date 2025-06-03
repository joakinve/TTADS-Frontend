import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pa-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.css']
})
export class FormButtonsComponent {

  @Output() cancelar = new EventEmitter<void>();

}
