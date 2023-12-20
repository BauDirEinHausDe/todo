import {Component} from '@angular/core';
import {LocalstorageService} from "../../services/localstorage.service";
import {MessageBoxComponent} from "../message-box/message-box.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        MessageBoxComponent
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css'
})
export class SettingsComponent {
    check1:boolean=false;
    check2:boolean=false;
    message:string="";
    constructor(private storageService: LocalstorageService) {
        this.check1=this.storageService.getSortSetting();

        this.check2=this.storageService.getShowDeleteButtons();
    }

    public deleteAll(): void {
        this.storageService.deleteAll();
        this.message="Erfolgreich gelöscht";
    }

    public save(): void {
      var todo1Checked: boolean = (<HTMLInputElement>document.getElementById("todo1")).checked;
      var todo2Checked: boolean = (<HTMLInputElement>document.getElementById("todo2")).checked;
      if(todo2Checked){
      this.storageService.changeSettingsDelete(true);
      }else{
          this.storageService.changeSettingsDelete(false);
      }
      if(todo1Checked){
          this.storageService.changeSort(true);
      }else{
          this.storageService.changeSort(false);

      }
      this.message="Erfolgreich übernommen";
    }

    public createSamples():void{
      this.storageService.createSampleTodos();
        this.message="Testdaten wurden angelegt";
    }
}
