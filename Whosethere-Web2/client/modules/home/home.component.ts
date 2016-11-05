import {Component, AfterViewInit} from "@angular/core";
import {BackEndServer} from "../../providers/server.provider";

declare var tracking;
declare var navigator;
declare var video;
declare var dat;
declare var Webcam;
declare var Clarifai;
declare var firebase;

@Component({
    selector: "home",
    styleUrls: [`client/modules/home/home-css/home.firstpage.css`],
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent implements AfterViewInit {


    constructor(private bServer: BackEndServer) {

        console.log(firebase);

        var clarifai = new Clarifai.App(
            'W9bNEQDDpNqYj640R7KtnUeDyfVJSKun4lKJ4XDt',
            'rLWIMBW997dv91HzHXfJ3wW01E7_kOfsn1FSizwR'
        );


        clarifai.inputs.search([
            {
                url: 'https://randomuser.me/api/portraits/men/34.jpg'
            }
        ]).then(
            function(response) {
                // do something with response
                console.log(response);
            },
            function(err) {
                // there was an error
                console.log(err);
            }
        );

        console.log(clarifai);

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

        console.log(clarifai);
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
        // tracker.setInitialScale(4);
        // tracker.setStepSize(2);
        // tracker.setEdgesDensity(0.1);

        // tracking.track('#video', tracker, { camera: true });

        // tracker.on('track', (event) => {
        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //     event.data.forEach(function(rect) {
        //         context.strokeStyle = '#a64ceb';
        //         context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        //         context.font = '11px Helvetica';
        //         context.fillStyle = "#fff";
        //         context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        //         context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        //     });
        // });


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

    snapPicture(){
     console.log("test");
        Webcam.snap( (data_uri) => {
            // console.log(encodeURIComponent(data_uri));
            console.log(data_uri);
            this.turnIntoBlob(data_uri);
            document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
        } );
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



}
