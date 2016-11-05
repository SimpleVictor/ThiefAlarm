import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth } from "angular2-jwt";
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";

import { AppComponent }  from './app.component';
import { routing } from "./routes";

import { HomeModule } from "./modules/home/home.module";
import {FaceModule} from "./modules/face/face.module";
import {CommandsModule} from "./modules/commands/commands.module";
import {RecentModule} from "./modules/recent/recent.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgSemanticModule,
        HomeModule,
        FaceModule,
        CommandsModule,
        RecentModule,
        routing
    ],
    providers: [
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {}
