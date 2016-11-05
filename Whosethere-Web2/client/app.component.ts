import { Component } from "@angular/core";

@Component({
    selector: "app",
    styleUrls: [`client/home.sidebar.component.css`],
    template: `
    <div class="logo-component">
        <!--<img class="ghost-img" src="assets/img/ghostcam-logo.png">-->
        <!--<h2 class="ghost-title">Cam</h2>-->
        <div class="camera-container">
            <div class="circle">
                <img src="http://res.cloudinary.com/drvsa2doz/image/upload/v1464787909/top_kh1j57.png" class="top" height="45px">
                <div class="camera-eye">
                    <div class="inner-eye">
                        <div class="blinking"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ul class="menu">
        <li title="home"><a routerLink="/home" class="active home">home</a></li>
        <li title="search"><a routerLink="/commands" class="search">search</a></li>
        <li title="pencil"><a routerLink="/face" class="pencil">pencil</a></li>
        <li title="about"><a routerLink="/recent" class="about">about</a></li>
        <li title="archive"><a class="archive">archive</a></li>
        <li title="contact"><a href="#" class="contact">contact</a></li>
    </ul>
<router-outlet></router-outlet>
`
})
export class AppComponent {

    constructor() {

    }

}
