import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import {AppSettings} from '../../config/app.settings';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataResult }   from '../shared/data-result';

@Injectable()
export class UtilityService {

    private apiUrl = AppSettings.API_ENDPOINT;  // URL to web API
    count: number = 0;
    totalPages: number = 0;

    constructor (private http: Http) { }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
