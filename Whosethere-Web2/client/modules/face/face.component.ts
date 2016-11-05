import { Component, OnInit , AfterViewInit} from '@angular/core';

declare var Clarifai;
declare var $;
declare var TweenMax;
declare var Bounce;
declare var Circ;


@Component({
    styleUrls: [`client/modules/face/face.component.css`],
    templateUrl: `client/modules/face/face.component.html`
})
export class FaceComponent implements OnInit, AfterViewInit {
    clarifai;
    AllUsers;

    addButton;
    deleteButton;
    goBackButton;

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

    ngAfterViewInit(){

        var inputElement = document.getElementById("fileuip");
        function handleFiles() {
            var fileList = this.files; /* now you can work with the file list */
            console.log(fileList);
            var reader = new FileReader();

            reader.onload = (e) => {
                $('#picture-holder')
                    .attr('src', e.target.result)
                    .width(350)
                    .height(250);
            };

            reader.readAsDataURL(fileList[0]);
        }
        inputElement.addEventListener("change", handleFiles, false);

        let real = this.readURL;


    }

    AddButtonClicked(){
        console.log("checks");

        let byeBye = () => {
            let add_container = $("#add-container");
            let add_segment = $("#add-segment");
            this.goBackButton = $("#goBackButton");
            this.goBackButton.css("opacity", 1);

            TweenMax.to(add_container, 0.1, {opacity: 1 , ease:Circ.easeOut});
            TweenMax.from(add_segment , 1, {scale: 0 , ease:Circ.easeOut});
            TweenMax.from(this.goBackButton, 1, {scale: 0 , ease:Circ.easeOut});
        }

        this.addButton = $("#addButton");
        this.deleteButton = $("#deleteButton");
        TweenMax.to(this.addButton, 0.5, {scale: 0 , ease:Circ.easeOut});
        TweenMax.to(this.deleteButton, 0.5, {scale: 0 , ease:Circ.easeOut});

        let profile_container = $("#user-row");
        TweenMax.to(profile_container, 0.5, {scale: 0 , ease:Circ.easeOut, onComplete: byeBye});
    }

    GoBackButton(){
        // TweenMax.to(this.addButton, 0.5, {scale: 1 , ease:Circ.easeOut});
        // TweenMax.to(this.deleteButton, 0.5, {scale: 1 , ease:Circ.easeOut});
    }

    readURL(input) {
        console.log("Yex");
        console.log(input);
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input);
        }
    }


}
