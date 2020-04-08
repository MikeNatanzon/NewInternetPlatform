import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserInfoService } from '../../shared/services/user-info.service';
import { DashboardLabels } from './dashboard.labels';

/**
 * User dashboard page
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(
    protected router: Router,
    protected userInfoService: UserInfoService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = DashboardLabels;
  }

}
