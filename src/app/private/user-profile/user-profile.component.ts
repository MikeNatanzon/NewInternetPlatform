import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserInfoService } from '../../shared/services/user-info.service';
import { UserProfileLabels } from './user-profile.labels';

/**
 * User profile page
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseComponent implements OnInit {

  constructor(
    protected userInfoService: UserInfoService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = UserProfileLabels;
  }

}
