import { Routes, RouterModule } from '@angular/router';
import {CommandsComponent} from "./commands.component";


export const routes: Routes = [
    { path: 'commands', component: CommandsComponent }
];

export const routing = RouterModule.forChild(routes);
