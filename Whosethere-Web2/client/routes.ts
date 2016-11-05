import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        //face
        path: 'face',
        loadChildren: 'client/modules/face/face.module#FaceModule'
    },
    {
        //commands
        path: 'commands',
        loadChildren: 'client/modules/commands/commands.module#CommandsModule'
    },
    {
        //recent
        path: 'recent',
        loadChildren: 'client/modules/recent/recent.module#RecentModule'
    },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
