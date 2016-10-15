import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AdviceService {

    constructor(private _http: Http) { }

    getAdvice(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http
            .get('http://api.adviceslip.com/advice')
            .map((res: Response) => res.json());
    };
}
