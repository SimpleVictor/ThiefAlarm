import {Component, AfterViewInit, OnDestroy} from "@angular/core";
import {BackEndServer} from "../../providers/server.provider";

declare var tracking;
declare var navigator;
declare var video;
declare var dat;
declare var Webcam;
declare var Clarifai;
declare var firebase;
declare var $;

declare var TweenMax;
declare var Bounce;
declare var Circ;

@Component({
    selector: "home",
    styleUrls: [`client/modules/home/home-css/home.firstpage.css`],
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent implements AfterViewInit, OnDestroy {

    aud;
    clarifai;
    sixPictureURL = {
        1: "",
        2: "",
        3:"",
        4: "",
        5: "",
        6: ""
    };

    statusQUO = "Not yet started";

    predictingMode: boolean = false;

    allUsers:any = {};
    userAmount;

    predictResult;

    tracker;
    trackerTask;

    statusContainer;

    currentActiveStep = "1";

    mainPredict;

    constructor(private bServer: BackEndServer) {

        this.clarifai = new Clarifai.App(
            'bTMzaZJMhkuBrrwqrtPceNg3c_vNMtMkE8CGHlOp',
            'sqFkvLgm8CcFQ7OMYnPv2vwryzoHkkIpSSfwOHlF'
        );

        this.clarifai.inputs.list().then(
            (response) => {
                // do something with response
                console.log(response);
                this.userAmount = response.length;
                for(let i = 0; i < response.length; i++){
                    this.allUsers[response[i].id] = {imgUrl:response[i].imageUrl};
                }

            },
            function(err) {
                console.log(err);
                // there was an error
            }
        );





        // this.clarifai.inputs.delete('ea5df8dcde6a42678e1ebf8cc889714c').then(
        //     function(response) {
        //         // do something with response
        //         console.log("good");
        //     },
        //     function(err) {
        //         console.log("bruh");
        //         // there was an error
        //     }
        // );


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
                console.log(data);
            }, (err) => {
                console.log("err");
            }
        );


    }

    ngAfterViewInit(){

        this.statusContainer = document.getElementById("update-status");
        // Webcam.set({
        //     width: 640,
        //     height: 480
        // });
        Webcam.attach("#video");
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        this.tracker = new tracking.ObjectTracker(['face']);
        this.tracker.setInitialScale(4);
        this.tracker.setStepSize(2);
        this.tracker.setEdgesDensity(0.1);

        this.trackerTask = tracking.track('#video', this.tracker, { camera: true });
        // this.trackerTask = tracking.track('#video', this.tracker);

        console.log(this.tracker);
        let counter = 1;

        this.statusContainer.innerHTML = "";
        this.statusContainer.innerHTML = `Status : <span style="color: #17AA1C;font-weight: bolder">ON</span>`;


        this.tracker.on('track', (event) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
                event.data.forEach((rect) => {
                    if(counter < 7){
                        this.snapPicture(counter);
                        counter++;
                    }

                    // context.strokeStyle = '#a64ceb';
                    context.strokeStyle = '#17AA1C';
                    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    context.font = '11px Helvetica';
                    context.fillStyle = "#fff";
                    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                });
        });


        let randomBox = $("#stats");
        randomBox.remove();

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

        // var gui = new dat.GUI();
        // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
        // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
        // gui.add(tracker, 'stepSize', 1, 5).step(0.1);

    }


    ngOnDestroy(){
        console.log(this.trackerTask);
        // var trackerTask = tracking.track('#video', this.tracker);
        this.trackerTask.stop(); // Stops the tracking
        // console.log(trackerTask);
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
        var storageRef = firebase.storage().ref(`multiplefiles/checker${val}.jpg`).put(blob).then((snapshot) => {
            // console.log(snapshot);
            this.sixPictureURL[val] = snapshot.downloadURL;
            console.log(`Uploaded a blob or file!: ${val}`);
            if(val === 6){
                let icon1 = $("#icon1");
                let stepactive1 = $("#active-step1");


                stepactive1.css("border-top", "3px solid green");
                stepactive1[0].className = '';
                stepactive1[0].className = 'step';

                icon1[0].className = '';
                icon1.css("color", '#17AA1C');
                icon1[0].className = 'check circle outline icon';

                this.predictingMode = true;
                this.SendToClarifai(this.sixPictureURL);
            };
        });

    }

    SendToClarifai(URLS){



        setTimeout(() => {
            let icon1 = $("#icon2");
            let stepactive1 = $("#active-step2");
            stepactive1.css("border-top", "3px solid green");
            stepactive1[0].className = '';
            stepactive1[0].className = 'step';

            icon1[0].className = '';
            icon1.css("color", '#17AA1C');
            icon1[0].className = 'check circle outline icon';
        }, 300);


        setTimeout(() => {

        let icon1 = $("#icon3");
        let stepactive1 = $("#active-step3");
        stepactive1.css("border-top", "3px solid green");
        stepactive1[0].className = '';
        stepactive1[0].className = 'step';

        icon1[0].className = '';
        icon1.css("color", '#17AA1C');
        icon1[0].className = 'check circle outline icon';

        }, 700);


        this.clarifai.models.predict("bc679e67213e4a0c8fdbdbebdcea6a0e", URLS[1]).then(
            (response) => {
                // do something with response
                console.log(response);
                this.predictResult = response.data.outputs[0].data.concepts;
                for(let i = 0; i < this.predictResult.length; i++){
                    if(i === 0){
                        let obj = {
                            name: this.predictResult[i].id,
                            picture: this.allUsers[this.predictResult[i].id].imgUrl
                        };

                            let icon1 = $("#icon4");
                            let stepactive1 = $("#active-step4");
                            stepactive1.css("border-top", "3px solid green");
                            stepactive1[0].className = '';
                            stepactive1[0].className = 'step';

                            icon1[0].className = '';
                            icon1.css("color", '#17AA1C');
                            icon1[0].className = 'check circle outline icon';

                        this.mainPredict = obj;
                    }
                    this.allUsers[this.predictResult[i].id].percent = this.predictResult[i].value;
                }


                let icon1 = $("#icon5");
                let stepactive1 = $("#active-step5");
                stepactive1.css("border-top", "3px solid green");
                stepactive1[0].className = '';
                stepactive1[0].className = 'step';

                icon1[0].className = '';
                icon1.css("color", '#17AA1C');
                icon1[0].className = 'check circle outline icon';


                this.predictingMode = false;
                this.SuccessAlarm();
                console.log(this.mainPredict);

                // if(this.mainPredict.name )

                console.log(this.bServer.allUsers[this.mainPredict.name]);

                for(let i = 0; i < this.bServer.allUsers.length; i++){
                    if(this.bServer.allUsers[i].name === this.mainPredict.name && this.bServer.allUsers[i].condition === "danger"){
                        console.log("DANGER ALERT");
                        this.SoundAlarm();
                    }

                    if(this.bServer.allUsers[i].name === this.mainPredict.name && this.bServer.allUsers[i].condition === "safe"){
                        console.log("SAFE ALERT");
                    }

                    if(this.bServer.allUsers[i].name === this.mainPredict.name && this.bServer.allUsers[i].condition === "cautious"){
                        console.log("CAUTIOUS ALERT");
                    }


                }


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


    TurnOnReset(){

    }

    TurnOnButton(){
        console.log("Running ON");
        this.statusContainer.innerHTML = "";
        this.statusContainer.innerHTML = `Status : <span style="color: #17AA1C;font-weight: bolder">ON</span>`;
        this.trackerTask.run();
    }

    TurnOffButton(){
        console.log("Running OFF");
        this.statusContainer.innerHTML= ``;
        this.statusContainer.innerHTML= `Status : <span style="color: RED;font-weight: bolder">OFF</span>`;
        this.trackerTask.stop();
    }


    SendText(){

    }

    SoundAlarm(){
        $('.bidbye').css("display","block");
        this.aud = document.getElementById('audio');
        console.log($("#audio"));
        this.aud.play();
    }

    StopAlarm(){
        $('.bidbye').css("display","");
        this.aud.pause();
    }


    SuccessAlarm(){
        let successAud = document.getElementById('success');
        successAud.play();
    }






}



















