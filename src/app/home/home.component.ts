import { Component, OnInit } from '@angular/core';
import { BaseComponent} from '../shared/components/base/base.component';
import { UserInfoService } from '../shared/services/user-info.service';
import { HomeLabels } from './home.labels';

/**
 * Home page
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(
    protected userInfoService: UserInfoService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = HomeLabels;
  }

}
