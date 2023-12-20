import {Injectable} from '@angular/core';
import {Todo} from "../entities/Todo";
import {Category} from "../entities/Category";
import {Priority} from "../entities/Priority";
import {Settings} from "../entities/Settings";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private todos: Todo[] = [];
  private settings: Settings = new Settings(true,true);

  constructor() {
    this.loadLocalStorage();
  }

  public createSampleTodos(): void {
    for(let i = 0; i != 10; i++) {
      this.todos.push(new Todo(
          this.getNextId(), "SampleData", new Date(), new Category(i.toString(), "Finanzen"), Priority.high
      ));
    }
    this.saveToStorage();
  }

  public getNextId(): string {
    let highestId: number = 0;
    for(let i = 0; i != this.todos.length ; i++) {
      const todo: Todo = this.todos[i];
      if(Number(todo.id) > highestId) {
        highestId = Number(todo.id);
      }
    }
    return (highestId + 1).toString();
  }

  public addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveToStorage();
  }

  public getAllTodos(): Todo[] {
    return this.todos;
  }

  public loadLocalStorage(): void {
    const storage = localStorage.getItem('todos');
    if(storage) {
      this.todos = JSON.parse(storage);
    }

    const stringSettings = localStorage.getItem('settings');
    if(stringSettings) {
      this.settings = JSON.parse(stringSettings);
    }
  }

  public changeSettingsDelete(setting:boolean):void{;
    if(setting){
      this.settings.deleteButton=true;
    }else{
      this.settings.deleteButton=false;
    }
  }
  public changeSort(setting:boolean):void{
    if(setting){
      this.settings.sort=true;
    }else{
      this.settings.sort=false;
    }
  }


  public getShowDeleteButtons(): boolean {
    return this.settings.deleteButton;
  }
  public getSortSetting():boolean{
    return this.settings.sort;
  }

  public findByCategory(category: string): Todo[] {
    return this.todos.filter((todo: Todo): boolean => {
      if(todo.category?.label == category) {
        return true;
      }
      return false;
    });
  }

  public findBySearch(query: string): Todo[] {
    return this.todos.filter((todo: Todo): boolean => {
      if(todo.label?.includes(query)) {
        return true;
      }
      return false;
    });
  }

  public findByMulitple(query: string, category: string): Todo[] {
    return this.todos.filter((todo: Todo): boolean => {
      if(todo.label?.includes(query) && todo.category?.label == category) {
        return true;
      }
      return false;
    });
  }

  public saveToStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  public deleteTodo(todoId: string | undefined): void {
    if (todoId) {
      const index = this.todos.findIndex((todo: Todo) => todo.id === todoId);

      if (index !== -1) {
        this.todos.splice(index, 1);
        this.saveToStorage();
      }
    }
  }

  public deleteAll(): void {
    this.todos = [];
    localStorage.removeItem('todos');
  }
}
