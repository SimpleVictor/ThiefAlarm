import { Component, OnInit , AfterViewInit} from '@angular/core';

declare var Clarifai;
declare var $;
declare var TweenMax;
declare var Bounce;
declare var Circ;

declare var firebase;

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

    fileLink;

    constructor() {

        this.clarifai = new Clarifai.App(
            'bTMzaZJMhkuBrrwqrtPceNg3c_vNMtMkE8CGHlOp',
            'sqFkvLgm8CcFQ7OMYnPv2vwryzoHkkIpSSfwOHlF'
        );
    }
    ngOnInit() {
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


        // this.clarifai.inputs.create([
        //     {
        //         url: "https://randomuser.me/api/portraits/men/53.jpg",
        //         id: 'John Smith',
        //         concepts: [
        //             {
        //                 id: "John Smith",
        //                 value: true
        //             }
        //         ]
        //     },
        //     {
        //         url: "https://randomuser.me/api/portraits/men/40.jpg",
        //         id: 'Eric Hernandez',
        //         concepts: [
        //             {
        //                 id: "Eric Hernandez",
        //                 value: true
        //             }
        //         ]
        //     },
        //     {
        //         url: "https://randomuser.me/api/portraits/men/95.jpg",
        //         id: 'Jason Lai',
        //         concepts: [
        //             {
        //                 id: "Jason Lai",
        //                 value: true
        //             }
        //         ]
        //     },
        //     {
        //         url: "https://randomuser.me/api/portraits/men/13.jpg",
        //         id: 'Johnny Tran',
        //         concepts: [
        //             {
        //                 id: "Johnny Tran",
        //                 value: true
        //             }
        //         ]
        //     },
        //     {
        //         url: "https://randomuser.me/api/portraits/men/70.jpg",
        //         id: 'Henry Smith',
        //         concepts: [
        //             {
        //                 id: "Henry Smith",
        //                 value: true
        //             }
        //         ]
        //     },
        //     {
        //         url: 'https://firebasestorage.googleapis.com/v0/b/faceproject-ef088.appspot.com/o/br.jpg?alt=media&token=f05d55b0-720b-427e-9c1f-c62d5961f2dd',
        //         id: 'Victor Le',
        //         concepts: [{
        //             id: 'Victor Le',
        //             value: true
        //         }]
        //     }
        // ]).then(
        //     function(response) {
        //         // do something with response
        //         console.log("sucess1");
        //         console.log(response);
        //     },
        //     function(err) {
        //         console.log(err);
        //         // there was an error
        //     }
        // );

    }

    ngAfterViewInit(){

        var inputElement = document.getElementById("fileuip");
        function handleFiles(){
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
            // var storageRef = firebase.storage().ref("test.jpg").put(fileList[0]).then(function(snapshot) {
            //     console.log(snapshot);
            //     console.log('Uploaded a blob or file!');
            // });
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

    FileSubmit(){
        // console.log($('#picture-holder')[0].src);
        this.TurnIntoBlob($('#picture-holder')[0].src);
    }

    TurnIntoBlob(dataURI){
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
        }

        var dataView = new DataView(arrayBuffer);
        var blob = new Blob([dataView], { type: mimeString });
        console.log(blob);

        var storageRef = firebase.storage().ref("blmaskj.jpg").put(blob).then((snapshot) => {
            console.log("Sucess!!");
            this.fileLink = snapshot.downloadURL;
            console.log('Uploaded a blob or file!');
        });

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
