import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

import {cachedJokes} from './cached-jokes.ts';

@Injectable()
export class ChuckNorrisJokesService {

    constructor(private _http: Http) { }

    getAdvice(): Observable<any> {
        return this._http
            .get('https://api.chucknorris.io/jokes/random')
            .map((res: Response) => res.json());
    };
    getCachedAdvice(){
        let rand = Math.floor(Math.random() * 4);
        return cachedJokes.cache[rand].value;
    }
}
