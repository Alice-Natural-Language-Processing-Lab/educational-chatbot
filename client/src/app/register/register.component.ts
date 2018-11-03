import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      u_class: this.fb.control('', Validators.required),
      mobile_number: this.fb.control('', [Validators.required, Validators.minLength(10),
      Validators.maxLength(10)]),
      pwd: this.fb.control('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.registerForm);
    this.userService.registerUser(this.registerForm.value).subscribe(
      (data) => {
        console.log(data);
        if (data.email === this.registerForm.value.email) {
          console.log(data);
          this.router.navigate(['/user-details']);
        }
       }
    );
  }
}
