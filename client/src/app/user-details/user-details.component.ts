import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../model/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  res = false;
  constructor(private userService: UserService) { }
  user: IUser;
  ngOnInit() {
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
        this.res = true;
      }
    );
  }

}
