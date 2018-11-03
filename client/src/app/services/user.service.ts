import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from '../model/user.model';
@Injectable()
export class UserService {

  user: IUser;
  constructor(private http: HttpClient) { }

  registerUser(details: any): Observable<any> {
    return this.http.post('http://localhost:8100/user/register', details)
      .pipe(
        map((data: IUser) => {
          console.log(data);
          this.user = data;
          return this.user;
        })
      );
  }

  loginUser(details: any): Observable<any> {
    return this.http.post('http://localhost:8100/user/login', details)
      .pipe(
        map((data: IUser) => {
          console.log(data);
          this.user = data[0];
          return this.user;
        })
      );
  }

  getUserDetails() {
    console.log(this.user.email);
      return this.http.post('http://localhost:8100/user', {email: this.user.email}).pipe(
        map((data: IUser) => {
          console.log(data);
          this.user = data[0];
          return this.user;
        })
      );

  }
  getDetails(): string {
    return this.user.email;
  }

}
