import { Routes, RouterModule } from '@angular/router';

import {FaceComponent} from "./face.component";

export const routes: Routes = [
    { path: 'face', component: FaceComponent }
];

export const routing = RouterModule.forChild(routes);
