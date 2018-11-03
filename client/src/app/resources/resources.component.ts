import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resourcesArr: any;
  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(
      (data) => {
        console.log(data);
        this.resourcesArr = data;
      }
    );
  }

}
