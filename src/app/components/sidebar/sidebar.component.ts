import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
      CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() categorySort: EventEmitter<string> = new EventEmitter<string>();
  public showSidebar: boolean = true;

  constructor() {
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  sortByCategory(event: Event): void {
    const targetValue: string = (<HTMLLIElement> event.target).innerHTML;
    this.categorySort.emit(targetValue);
  }
}
