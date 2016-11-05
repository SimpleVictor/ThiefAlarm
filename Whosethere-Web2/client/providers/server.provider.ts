import { Injectable, NgZone } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import * as CONFIGS from "../myconfig";
import 'rxjs/Rx';

declare var Clarifai;
declare var firebase;


@Injectable()
export class BackEndServer {

    clarifai;

    allUsers:any = [];

    zone;

    constructor(private http_: Http) {

        this.clarifai = new Clarifai.App(
            'bTMzaZJMhkuBrrwqrtPceNg3c_vNMtMkE8CGHlOp',
            'sqFkvLgm8CcFQ7OMYnPv2vwryzoHkkIpSSfwOHlF'
        );


        var config = {
            apiKey: CONFIGS.myConfigs.apiKey,
            authDomain: CONFIGS.myConfigs.authDomain,
            databaseURL: CONFIGS.myConfigs.databaseURL,
            storageBucket: CONFIGS.myConfigs.storageBucket,
            messagingSenderId: CONFIGS.myConfigs.messagingSenderId
        };

        firebase.initializeApp(config);

        this.zone = new NgZone({enableLongStackTrace: false});
        let valueChanged = firebase.database().ref("/users");


        valueChanged.on("value", (snapshot) => {
            let obj = snapshot.val();
            console.log(obj);

            this.zone.run(() => {
                Object.keys(obj).forEach((key) => {
                    let newObj = {
                        name: key,
                        picture: 'null',
                        condition: obj[key].condition
                    };
                    this.allUsers.push(newObj);
                });
                this.getAllUsers();
            });
        });



    }

    sendBlob(blob){
        // let body = JSON.stringify(blob);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http_.post(`/login`, body, options).map((res: Response) => res.json());
        return this.http_.get(`/login`).map((res: Response) => res.json());
    }

    getAllUsers(){
        this.clarifai.inputs.list().then(
            (response) => {
                // do something with response
                console.log(response);
                for(let i = 0; i < response.length; i++){
                    for(let d = 0; d < this.allUsers.length; d++){
                        if(this.allUsers[d].name === response[i].id){
                            this.allUsers[d].picture = response[i].imageUrl;
                        };
                    };
                };
                console.log(this.allUsers);
            },
            function(err) {
                console.log(err);
                // there was an error
            }
        );
    }

    sendIndividualDataToFirebase(user){
        let newObj = {
            [user.name]: {
                condition: user.condition
            }
        };
            let body = JSON.stringify(newObj);
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            return this.http_.patch(`https://faceproject-ef088.firebaseio.com/users/.json`, body, options).map((res: Response) => res.json());

    }


    ChangeConditionFromUser(user){
        let newObj = {
            [user.name]: {
                condition: user.condition
            }
        };
        let body = JSON.stringify(newObj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http_.patch(`https://faceproject-ef088.firebaseio.com/users/.json`, body, options).map((res: Response) => res.json());
    }


}
