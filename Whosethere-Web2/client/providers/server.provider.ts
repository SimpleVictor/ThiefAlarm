import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class BackEndServer {

    constructor(private http_: Http) { }

    sendBlob(blob){
        let body = JSON.stringify(blob);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http_.post(`/login`, body, options).map((res: Response) => res.json());
    }


}
