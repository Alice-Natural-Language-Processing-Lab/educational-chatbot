import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TestService } from '../services/test.service';
@Component({
  selector: 'app-test-select',
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.css']
})
export class TestSelectComponent implements OnInit {

  selectTest: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
              private testService: TestService) { }

  ngOnInit() {
    this.selectTest = this.fb.group({
      subject: ['']
    });
  }

  onSubmit() {
    console.log(this.selectTest);
    this.testService.setSubject(this.selectTest.value.subject);
    this.router.navigate(['/test']);

  }
}
