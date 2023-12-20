import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Priority} from "../../entities/Priority";
import {Todo} from "../../entities/Todo";
import {ControlContainer, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-priority-chooser',
  standalone: true,
  imports: [
      CommonModule
  ],
  templateUrl: './priority-chooser.component.html',
  styleUrl: './priority-chooser.component.css'
})
export class PriorityChooserComponent {
  public form: FormGroup = new FormGroup({});
  priority=Priority;
  @Output() emitPriority = new EventEmitter<Priority>();
  @Input() todo: Todo=new Todo();

  constructor(
      private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    this.form = <FormGroup> this.controlContainer.control;
  }

  select(priority:Priority){
    this.emitPriority.emit(priority);
  }

  changePriorityValue(value: string): void {
    this.form.get('priority')?.setValue(value);
  }
}
