import { StatsService } from './../services/stats.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IStat } from '../model/stat.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  flag = false;
  userEmail: string;
  stats: IStat[];
  constructor(private userService: UserService, private statsService: StatsService) { }
  score = [];
  ngOnInit() {
    this.userEmail = this.userService.getDetails();
    // this.userEmail = 'apple';
    const obj = { email: this.userEmail };
    this.statsService.getStats(obj).subscribe(
      (data: IStat[]) => {
        console.log(data);
        this.stats = data;
        // if (data.length === 0) {
        //   this.flag = true;
        // }
        // this.stats = data;
        let i = 0;
        for (i = 0; i < this.stats.length; i++) {
          this.score[i] = 3 * this.stats[i].nDiffCorrect + 2 * this.stats[i].nMediumCorrect + this.stats[i].nEasyCorrect;
        }
      }
    );

  }

}
