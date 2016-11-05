import { Component, OnInit } from '@angular/core';

declare var Clarifai;

@Component({
    styleUrls: [`client/modules/recent/recent.component.css`],
    templateUrl: `client/modules/recent/recent.component.html`
})
export class RecentComponent implements OnInit {

    clarifai;
    modelID;

    createdModel;

    constructor() {

        this.clarifai = new Clarifai.App(
            'O9Vo-rlDAlz7CC7408pyrQjouB9_UEkXGth8TqjU',
            'Mw8zRER2Xy9-3S5J3z1I1aJMELaHtff1PicplyZe'
        );

        console.log(this.clarifai);

    }

    ngOnInit() { }

    addClarifai(){
        this.clarifai.inputs.create({
            url: "https://randomuser.me/api/portraits/men/45.jpg",
            concepts: [
                {
                    id: "Ben",
                    value: true
                }
            ]
        }).then(
            (response) => {
                // do something with response
                console.log("sucess!");
                console.log(response);
            },
            (err) => {
                console.log("Failed");
                console.log(err);
                // there was an error
            }
        );
    }

    searchClarifai(){


        this.clarifai.models.list().then(
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


        //USE THIS TO FIND OUT HOW MANY PEOPLE ARE REGISTERED IN OUR SYSTEM
        // this.clarifai.inputs.list().then(
        //     function(response) {
        //         console.log("sucess!");
        //         console.log(response);
        //         // do something with response
        //     },
        //     function(err) {
        //         console.log("Failed");
        //         console.log(err);
        //         // there was an error
        //     }
        // );
    }

    trainClarifai(){
        console.log(this.modelID);
        this.clarifai.models.train("d78107a50b354ad9b2f671388bb6df0a").then(
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

    predictClarifai(){
        this.clarifai.models.predict("d78107a50b354ad9b2f671388bb6df0a", ["https://randomuser.me/api/portraits/men/99.jpg"]).then(
            function(response) {
                // do something with response
                console.log("sucess!");
                console.log(response);
            },
            function(err) {
                console.log(err);
                // there was an error
            }
        );
    }


    modelClarifai(){

        this.createdModel = this.clarifai.models.create("users",  [
            { "id": "everyone" }
        ]).then(
            (response) => {
                console.log("sucess!");
                console.log(response);
                this.modelID = response.id;
                // do something with response
            },
            (err) => {
                console.log("Failed");
                console.log(err);
                // there was an error
            }
        );

    }
}
