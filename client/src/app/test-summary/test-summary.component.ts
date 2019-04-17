import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-test-summary',
  templateUrl: './test-summary.component.html',
  styleUrls: ['./test-summary.component.css']
})
export class TestSummaryComponent implements OnInit {

  questionArray = [];
  ans: any;
  score = 0;
  constructor(private testService: TestService, private userService: UserService) { }

  ngOnInit() {
    this.questionArray = this.testService.getAttemptedQuestions();
    console.log(this.questionArray);
    console.log('user email is');
    console.log(this.userService.getDetails());
    // const obj = {
    //   quests: this.questionArray, subject: this.testService.getSubject(),
    //   userEmail: this.userService.getDetails()
    // };
    console.log(this.questionArray);
    // console.log(obj);
    let i = 0;
    for (i = 0; i < this.questionArray.length; i++) {
      if (this.questionArray[i].status === 'Correct') {
        this.score += this.questionArray[i].question.difficulty;
      }
    }

  }
}
