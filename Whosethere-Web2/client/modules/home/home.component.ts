import {Component, AfterViewInit} from "@angular/core";
import {BackEndServer} from "../../providers/server.provider";

declare var tracking;
declare var navigator;
declare var video;
declare var dat;
declare var Webcam;
declare var Clarifai;
declare var firebase;
declare var $;

@Component({
    selector: "home",
    styleUrls: [`client/modules/home/home-css/home.firstpage.css`],
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent implements AfterViewInit {

    clarifai;
    sixPictureURL = {
        1: "",
        2: "",
        3:"",
        4: "",
        5: "",
        6: ""
    };

    constructor(private bServer: BackEndServer) {
        console.log(firebase);

        this.clarifai = new Clarifai.App(
            'bTMzaZJMhkuBrrwqrtPceNg3c_vNMtMkE8CGHlOp',
            'sqFkvLgm8CcFQ7OMYnPv2vwryzoHkkIpSSfwOHlF'
        );

        // this.clarifai.inputs.list().then(
        //     function(response) {
        //         // do something with response
        //         console.log("hjere");
        //         console.log(response);
        //     },
        //     function(err) {
        //         console.log(err);
        //         // there was an error
        //     }
        // );

        this.clarifai.inputs.delete('ea5df8dcde6a42678e1ebf8cc889714c').then(
            function(response) {
                // do something with response
                console.log("good");
            },
            function(err) {
                console.log("bruh");
                // there was an error
            }
        );


        // this.clarifai.inputs.search([
        //     {
        //         url: 'https://randomuser.me/api/portraits/men/34.jpg'
        //     }
        // ]).then(
        //     function(response) {
        //         // do something with response
        //         console.log(response);
        //     },
        //     function(err) {
        //         // there was an error
        //         console.log(err);
        //     }
        // );


        let obj = {
            dude: "fsdfsdf"
        };

        this.bServer.sendBlob(obj).subscribe(
            (data) => {
                console.log("sucess!!");
                console.log(data);
            }, (err) => {
                console.log("err");
            }
        );

    }

    ngAfterViewInit(){
        // Webcam.set({
        //     width: 640,
        //     height: 480
        // });
        Webcam.attach("#video");
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var tracker = new tracking.ObjectTracker(['face']);
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        tracking.track('#video', tracker, { camera: true });

        let counter = 1;

        tracker.on('track', (event) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
                event.data.forEach((rect) => {
                    if(counter < 7){
                        this.snapPicture(counter);
                        counter++;
                    }

                    context.strokeStyle = '#a64ceb';
                    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    context.font = '11px Helvetica';
                    context.fillStyle = "#fff";
                    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                });
        });


        // var trackerTask = tracking.track('#video', tracker);
        // trackerTask.stop();

        // window.plot = function(x, y, w, h) {
        //     var rect = document.createElement('div');
        //     document.querySelector('.demo-container').appendChild(rect);
        //     rect.classList.add('rect');
        //     rect.style.width = w + 'px';
        //     rect.style.height = h + 'px';
        //     rect.style.left = (video.offsetLeft + x) + 'px';
        //     rect.style.top = (video.offsetTop + y) + 'px';
        // };

        var gui = new dat.GUI();
        gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
        gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
        gui.add(tracker, 'stepSize', 1, 5).step(0.1);

    }

    snapPicture(val){
        Webcam.snap( (data_uri) => {
            // console.log(encodeURIComponent(data_uri));
            // console.log(data_uri);
            // this.turnIntoBlob(data_uri);
            $(`#img-place${val}`)[0].src = '';
            $(`#img-place${val}`)[0].src = data_uri;
            this.sendDataToFirebase(val, data_uri);

        } );
    }

    sendDataToFirebase(val, dataURI){
        let blob = this.blobFirebase(dataURI);
        var storageRef = firebase.storage().ref(`checker${val}.jpg`).put(blob).then((snapshot) => {
            // console.log(snapshot);
            this.sixPictureURL[val] = snapshot.downloadURL;
            console.log(`Uploaded a blob or file!: ${val}`);
            if(val === 6){
                this.SendToClarifai(this.sixPictureURL);
            };
        });

    }

    SendToClarifai(URLS){
        this.clarifai.models.predict("ee247b52f2bb46a2bbdb0b60c8468d15", [URLS[1],URLS[2],URLS[3],URLS[4],URLS[5],URLS[6]]).then(
            function(response) {
                // do something with response
                console.log("sucess!");
                console.log(response);

                response.data.outputs[0].data.concepts;

            },
            function(err) {
                console.log(err);
                // there was an error
            }
        );
    }

    turnIntoBlob(dataURI){

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

        // Create a root reference
        var storageRef = firebase.storage().ref("bro.jpg").put(blob).then(function(snapshot) {
            console.log(snapshot);
            console.log('Uploaded a blob or file!');
        });


    }

    blobFirebase(dataURI){
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
        return blob;
    }




}
