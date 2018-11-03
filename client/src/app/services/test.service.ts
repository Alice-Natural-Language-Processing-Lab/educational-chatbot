import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IQuestion } from '../model/question.model';
// import {HttpClient}
@Injectable()
export class TestService {

  subject: string;
  questions;
  constructor(private http: HttpClient) { }

  getTest(sub: string): Observable<any> {
    return this.http.post('http://localhost:8100/tests', {subject: sub});
  }

  getScores(questionsArray): Observable<any> {
    return this.http.post('http://localhost:8100/tests/submit', questionsArray);
  }

  setSubject(sub: string) {
    this.subject = sub;
    console.log('setting subject to' + this.subject);
  }

  getSubject(): string {
    console.log('getting subject as' + this.subject);
    return this.subject;
  }

  getQuestions(): any {
    console.log('returning questions as');
    console.log(this.questions);
    return this.questions;
  }

  setQuestions(quest: any) {
    this.questions = quest;
    console.log('setting quests to');
    console.log(this.questions);
  }

}
