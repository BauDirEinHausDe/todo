import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {
  @Input() message: string = '';
  @Input() error:boolean=false;
}
