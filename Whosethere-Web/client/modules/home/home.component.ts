import { Component, AfterViewInit } from "@angular/core";

declare var TweenMax;
declare var Bounce;
declare var Circ;
declare var Back;
declare var $;

@Component({
    selector: "home",
    styleUrls: [`client/modules/home/home-css/home.firstpage.css`],
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent implements AfterViewInit {

    lighthouse;


    constructor() {}


    ngAfterViewInit(){
        this.lighthouse= $('#light-container');
        TweenMax.from(this.lighthouse, 5.5, {y:'150px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});

        let rock1 = $("#rock1");
        let rock2 = $("#rock2");
        let rock3 = $("#rock3");
        let rock4 = $("#rock4");
        let rock5 = $("#rock5");
        let rock6 = $("#rock6");
        let rock7 = $("#rock7");
        let rock8 = $("#rock8");




        TweenMax.to(rock1 ,4.5, {y:'20px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock2, 2.5, {y:'54px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock3, 5.5, {y:'86px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock4, 3.5, {y:'23px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock5, 5.5, {y:'34px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock6, 8.5, {y:'87px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock7, 5.5, {y:'65px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});
        TweenMax.to(rock8, 2.5, {y:'76px', repeat:'infinite', yoyo:true, ease:Back.easeInOut});


    }


}
