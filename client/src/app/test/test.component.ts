import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../model/question.model';
import { TestService } from '../services/test.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questionArray: IQuestion[];
  questionsForm: FormGroup = this.fb.group({
    arr: this.fb.array([])
  });
  subject: string;
  constructor(private testService: TestService, private fb: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
    this.subject = this.testService.getSubject();
    this.testService.getTest(this.subject).subscribe(
      (data: IQuestion[]) => {
        console.log(data);
        this.questionArray = data;
        let i = 0;
        for (i = 0; i < data.length; i++) {
          const control = <FormArray>(this.questionsForm.get('arr'));
          control.push(this.newGroup());
        }
        console.log(this.questionsForm);
      }
    );

  }

  newGroup(): FormGroup {
      return  this.fb.group({
      option: [' ', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.questionsForm);
    for (let i = 0; i < this.questionArray.length; i++) {
      this.questionArray[i]['response'] = this.questionsForm.value.arr[i]['option'];
    }
    console.log('submit for test component');
    this.testService.setQuestions(this.questionArray);
    this.router.navigate(['/test-summary']);
  }

}
