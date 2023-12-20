import { Routes } from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {FormComponent} from "./components/form/form.component";
import {SettingsComponent} from "./components/settings/settings.component";

export const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'new', component: FormComponent},
    {path: 'settings', component: SettingsComponent}
];
