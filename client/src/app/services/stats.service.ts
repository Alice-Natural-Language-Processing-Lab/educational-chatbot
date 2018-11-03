import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class StatsService {
    constructor(private http: HttpClient) {
    }
    getStats(obj): Observable<any> {
        return this.http.post('http://localhost:8100/tests/stats', obj);
    }

}
