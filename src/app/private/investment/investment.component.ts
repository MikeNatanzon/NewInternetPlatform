import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserInfoService } from '../../shared/services/user-info.service';
import { InvestmentLabels } from './investment.labels';

/**
 * Investment page allow the user to determine the relative importance of all the categories/topics on the platform. It is called
 * "investment" since the relative importance of categories determines the PS of posts on the platform. The importance of each category
 * will then be determined according to the "vote" of all users on the Platform (of course, the weight of each user's "vote" is based on
 * that user's CS * PS)
 */
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent extends BaseComponent implements OnInit {

  constructor(
    protected userInfoService: UserInfoService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = InvestmentLabels;
    // TODO Implment Investment component
  }

}
