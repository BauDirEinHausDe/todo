import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PriorityComponent } from '../priority/priority.component';
import {Todo} from "../../entities/Todo";
import {DatePipe} from "@angular/common";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-list-entry',
  standalone: true,
    imports: [
        PriorityComponent,
        DatePipe
    ],
  providers: [],
  templateUrl: './list-entry.component.html',
  styleUrl: './list-entry.component.scss'
})
export class ListEntryComponent implements OnInit {

  @Output() message:EventEmitter<string>=new EventEmitter<string>();
  @Input() todo: Todo = new Todo();

  public showDeleteButtons: boolean = false;

  constructor(private dataService: LocalstorageService) {
  }

  ngOnInit(): void {
    this.showDeleteButtons = this.dataService.getShowDeleteButtons();
  }

  public toggleStatus(): void {
    this.todo.done = !this.todo.done;
    this.dataService.saveToStorage();
  }

  public deleteTodo(id?:string):void{
    this.dataService.deleteTodo(id);
    this.message.emit("Das Element mit der id:"+id+" wurde erfolgreich gelöscht");
  }
}

