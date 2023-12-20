import {Component} from '@angular/core';
import {PriorityChooserComponent} from "../priority-chooser/priority-chooser.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Todo} from "../../entities/Todo";
import {LocalstorageService} from "../../services/localstorage.service";
import {Category} from "../../entities/Category";
import {Priority} from "../../entities/Priority";
import {MessageBoxComponent} from "../message-box/message-box.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    PriorityChooserComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MessageBoxComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
message:string="";
error:boolean=false;
  applyForm = new FormGroup({
    label: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    priority:new FormControl('low', Validators.required)
  })

  constructor(private storageService: LocalstorageService) {}

  public submit(): void {
    this.error=false;
    const emptyFields = [];
    const labelValue = this.applyForm.get('label')?.getRawValue();
    if (!labelValue) {
      emptyFields.push(' Bezeichnung');
      this.error=true;
    }
    const dateValue = this.applyForm.get('date')?.getRawValue();
    if (!dateValue) {
      emptyFields.push(' Fällig bis');
      this.error=true;
    }
    const priorityValue = this.applyForm.get('priority')?.getRawValue();
    const categoryValue = this.applyForm.get('category')?.getRawValue();
    if (!categoryValue) {
      emptyFields.push(' Kategorie');
      this.error=true;
    }

    const id = this.storageService.getNextId();
    if(this.error){
      this.message= "Fehlende Eingabe:";
      this.message += emptyFields.join(',');
    }else {
      const todo: Todo = new Todo(id, labelValue, dateValue, new Category(id, categoryValue), priorityValue as Priority);
      this.message = "Erfolgreich hinzugefügt";
      this.storageService.addTodo(todo);
    }
  }
}
