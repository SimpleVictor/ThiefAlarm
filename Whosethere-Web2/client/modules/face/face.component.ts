import { Component, OnInit } from '@angular/core';

declare var Clarifai;

@Component({
    styleUrls: [`client/modules/face/face.component.css`],
    templateUrl: `client/modules/face/face.component.html`
})
export class FaceComponent implements OnInit {
    clarifai;
    AllUsers;

    constructor() {

        this.clarifai = new Clarifai.App(
            'O9Vo-rlDAlz7CC7408pyrQjouB9_UEkXGth8TqjU',
            'Mw8zRER2Xy9-3S5J3z1I1aJMELaHtff1PicplyZe'
        );
    }

    ngOnInit() {
        this.clarifai.inputs.list().then(
            function(response) {
                console.log("sucess!");
                console.log(response);
                // do something with response
            },
            function(err) {
                console.log("Failed");
                console.log(err);
                // there was an error
            }
        );

    }

}
