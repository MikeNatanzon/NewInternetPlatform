import { Component, ViewEncapsulation } from '@angular/core';
import { UserInfoService } from './shared/services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    protected userInfoService: UserInfoService
  ) {
    // TODO Implement language settings
    this.userInfoService.language = 'EN';
  }

}
