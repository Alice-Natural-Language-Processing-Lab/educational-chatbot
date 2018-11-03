import { StatsService } from './../services/stats.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  flag = false;
  userEmail: string;
  stats: any;
  constructor(private userService: UserService, private statsService: StatsService) { }

  ngOnInit() {
    this.userEmail = this.userService.getDetails();
    // this.userEmail = 'apple';
    const obj = {email: this.userEmail };
    this.statsService.getStats(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.length === 0) {
          this.flag = true;
        }
        this.stats = data;
      }
    );

  }

}
