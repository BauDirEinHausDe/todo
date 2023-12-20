import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Priority} from "../../entities/Priority";

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.css'
})
export class PriorityComponent implements OnChanges {

  @Input() priority?: Priority;
  public prio: string = "";

  ngOnChanges(changes: SimpleChanges) {
    if(this.priority) {
      this.prio = this.priority.toString();
    }
  }
}
