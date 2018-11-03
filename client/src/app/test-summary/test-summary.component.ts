import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-test-summary',
  templateUrl: './test-summary.component.html',
  styleUrls: ['./test-summary.component.css']
})
export class TestSummaryComponent implements OnInit {

  questionArray: any = [];
  ans: any;
  constructor(private testService: TestService, private userService: UserService) { }

  ngOnInit() {
    this.questionArray = this.testService.getQuestions();
    console.log('user email is');
    console.log(this.userService.getDetails());
    const obj = {quests: this.questionArray, subject : this.testService.getSubject(),
                userEmail: this.userService.getDetails()};
    console.log(this.questionArray);
    console.log(obj);
    this.testService.getScores(obj).subscribe(
      (data) => {
        this.ans = data;
        console.log(this.ans);
      }
    );
  }
}
