import { Component, OnInit } from '@angular/core';
import {ListEntryComponent} from "../list-entry/list-entry.component";
import {Todo} from "../../entities/Todo";
import {LocalstorageService} from "../../services/localstorage.service";
import {Observable} from "rxjs";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {MessageBoxComponent} from "../message-box/message-box.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ListEntryComponent,
    SidebarComponent,
    MessageBoxComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  public todos: Todo[] = [];

  private queryFilter: string = "";
  private categoryFilter: string = "Alle";
  public message:string="";
  public sort:boolean=false;

  constructor(
    private dataService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.finalSort();
  }

  sortByCategory(event: string): void {
    this.categoryFilter = event;
    this.finalSort();
  }

  sortByQuery(event: KeyboardEvent): void {
    const targetValue: string = (<HTMLInputElement>event.target).value;
    this.queryFilter = targetValue;
    this.finalSort();
  }

  finalSort(): void {
    if(this.categoryFilter != "Alle" && this.queryFilter != "") {
      this.todos = this.dataService.findByMulitple(this.queryFilter, this.categoryFilter);
    } else if(this.categoryFilter != "Alle") {
      this.todos = this.dataService.findByCategory(this.categoryFilter);
    } else if(this.queryFilter != "") {
      this.todos = this.dataService.findBySearch(this.queryFilter);
    } else {
      this.todos = this.dataService.getAllTodos();
    }
    this.SortByDone();
  }
  updateMessage(message:string){
    this.message=message;
  }

  SortByDone():void{
    this.sort=this.dataService.getSortSetting();
    if(this.sort) {
      this.todos.sort((todoA: Todo, todoB: Todo): number => {
        if (todoA.done) {
          return 1;
        }
        if (todoB.done) {
          return -1;
        }
        return 0;
      });
    }
  }

}
