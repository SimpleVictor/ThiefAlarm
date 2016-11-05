import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';

declare var Clarifai;

@Injectable()
export class BackEndServer {

    clarifai;

    allUsers:any = {};

    constructor(private http_: Http) {

        this.clarifai = new Clarifai.App(
            'bTMzaZJMhkuBrrwqrtPceNg3c_vNMtMkE8CGHlOp',
            'sqFkvLgm8CcFQ7OMYnPv2vwryzoHkkIpSSfwOHlF'
        );

    }

    sendBlob(blob){
        let body = JSON.stringify(blob);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http_.post(`/login`, body, options).map((res: Response) => res.json());
    }

    getAllUsers(){
        this.clarifai.inputs.list().then(
            (response) => {
                // do something with response
                console.log("hjere");
                console.log(response);
                for(let i = 0; i < response.length; i++){
                    this.allUsers[response[i].id] = {imgUrl:response[i].imageUrl};
                }

            },
            function(err) {
                console.log(err);
                // there was an error
            }
        );
    }


}
