import { Routes, RouterModule } from '@angular/router';
import {RecentComponent} from "./recent.component";


export const routes: Routes = [
    { path: 'recent', component: RecentComponent }
];

export const routing = RouterModule.forChild(routes);
