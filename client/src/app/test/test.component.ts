import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../model/question.model';
import { TestService } from '../services/test.service';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  attemptedQuestions = [];
  ready = false;
  isSubmit = false;
  nTypeQuest = [0, 0, 0];
  difficulty = 1;
  nQuestionsAttempted = 0;
  question: IQuestion;
  questionArray;
  easyQ: IQuestion[] = [];
  mediumQ: IQuestion[] = [];
  diffQ: IQuestion[] = [];
  nCorrect = 0;
  nWrong = 0;
  correctQuest = [0, 0, 0];
  questionsForm: FormGroup = this.fb.group({
    arr: this.fb.array([])
  });
  subject: string;
  constructor(private testService: TestService, private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.questionsForm = fb.group({
      option: new FormControl('')
    });
  }

  ngOnInit() {
    this.subject = this.testService.getSubject();
    // this.subject = 'chemistry';
    this.testService.getTest(this.subject).subscribe(
      (data: IQuestion[]) => {
        // console.log(data);
        // this.questionArray = data;
        let i = 0;
        // for (i = 0; i < data.length; i++) {
        //   const control = <FormArray>(this.questionsForm.get('arr'));
        //   control.push(this.newGroup());
        // }
        // console.log(this.questionsForm);

        // let i = 0;

        for (i = 0; i < data.length; i++) {
          if (data[i].difficulty === 1) {
            this.easyQ.push(data[i]);
          } else if (data[i].difficulty === 2) {
            this.mediumQ.push(data[i]);
          } else if (data[i].difficulty === 3) {
            this.diffQ.push(data[i]);
          }
        }
        this.questionArray = [this.easyQ, this.mediumQ, this.diffQ];

        // console.log(this.questionArray[0]);
        this.question = this.easyQ[0];
        this.ready = true;
        console.log(this.question);
      }
    );

  }

  submitAnswer() {

    console.log('selected ans: ' + this.questionsForm.value.option);
    this.isSubmit = true;
    this.nQuestionsAttempted++;
    this.nTypeQuest[this.difficulty - 1]++;

    if (this.question.answer === this.questionsForm.value.option) {
      const obj = {
        question: this.question,
        selected: this.questionsForm.value.option,
        status: 'Correct'

      };
      this.attemptedQuestions.push(obj);
      console.log('Correct');
      this.nCorrect++;
      this.correctQuest[this.difficulty - 1]++;
      if (this.difficulty < 3) {
        this.difficulty++;
      }
      console.log('New Difficulty ' + this.difficulty);
      if (this.nQuestionsAttempted === 3) {
        console.log('Finished test');
        this.ready = !this.ready;
        this.submitTest();

      } else {
        this.question = this.questionArray[this.difficulty - 1][this.nTypeQuest[this.difficulty - 1] + 1];
        this.isSubmit = false;
        console.log(this.question);
      }
    } else {
      const obj = {
        question: this.question,
        selected: this.questionsForm.value.option,
        status: 'Incorrect'

      };
      this.attemptedQuestions.push(obj);
      console.log('Wrong');
      if (this.difficulty > 1) {
        this.difficulty--;
      }
      console.log('New Difficulty' + this.difficulty);
      if (this.nQuestionsAttempted === 3) {
        console.log('Finished test');
        this.ready = !this.ready;
        this.submitTest();

      } else {
        this.question = this.questionArray[this.difficulty - 1][this.nTypeQuest[this.difficulty - 1]];
        this.isSubmit = false;
        console.log(this.question);
      }
    }


    this.questionsForm = this.fb.group({
      option: new FormControl('')
    });




  }

  submitTest() {
    const obj = {
      email: this.userService.getDetails(),
      subject: this.subject,
      nCorrect: this.nCorrect,
      nWrong: this.nQuestionsAttempted - this.nCorrect,
      nDiffCorrect: this.correctQuest[2],
      nDiffWrong: this.nTypeQuest[2] - this.correctQuest[2],
      nMediumCorrect: this.correctQuest[1],
      nMediumWrong: this.nTypeQuest[1] - this.correctQuest[1],
      nEasyCorrect: this.correctQuest[0],
      nEasyWrong: this.nTypeQuest[0] - this.correctQuest[0]
    };
    console.log(obj);
    this.testService.submitTest(obj).subscribe(
      (res) => {
        console.log(res);
        if (res.toString() === 'Successful') {
          this.testService.setAttemptedQuestions(this.attemptedQuestions);
          this.router.navigate(['/test-summary']);

        }
      }
    );
  }

  log() {
    console.log('change');
  }

}


// heroku_xls4s4v4
// Free@123
