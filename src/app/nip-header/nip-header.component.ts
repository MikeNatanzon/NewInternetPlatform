import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/components/base/base.component';
import { UserInfoService } from '../shared/services/user-info.service';
import { LabelsPipe } from '../shared/pipes/labels/labels.pipe';
import { NipHeaderLabels } from './nip-header.labels';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../shared/models/menu-item';

import { FlashMessagesService } from 'angular2-flash-messages';

/**
 * Header site
 */
@Component({
  selector: 'app-nip-header',
  templateUrl: './nip-header.component.html',
  styleUrls: ['./nip-header.component.scss']
})
export class NipHeaderComponent extends BaseComponent implements OnInit {

  faUser = faUser;

  /**
   * User menu
   */
  userMenu: Array<MenuItem> = [];

  constructor(
    protected router: Router,
    protected userInfoService: UserInfoService,
    private labelsPipe: LabelsPipe,
    private flashMessage: FlashMessagesService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = NipHeaderLabels;
    this.userInfoService.isUserLogged()
      .subscribe(isLogged => {
        this.setUserMenu();
      });
  }

  /**
   * Search in the site
   */
  search(): void {
    // TODO Implement search
  }

  /**
   * Set User menu
   */
  setUserMenu(): void {
    this.userMenu = [];
    const items: Array<MenuItem> = [];

    items.push({
      id: 'my-profile',
      label: this.labelsPipe.transform('myProfile', 'LABELS', this.language, this.labelsFile),
      function: this.goToMyProfile.bind(this),
      link: 'private/user-profile'
    });

    if (this.userInfoService.getUser()) {
      items.push({
        id: 'settings',
        label: this.labelsPipe.transform('settings', 'LABELS', this.language, this.labelsFile),
        function: this.goToLink.bind(this),
        link: 'home' // TODO Set router link
      });
      items.push({
        id: 'logout',
        label: this.labelsPipe.transform('logout', 'LABELS', this.language, this.labelsFile),
        function: this.logout.bind(this),
        link: 'home'
      });
    }

    this.userMenu = items;
  }

  trackByMenu(index, item: MenuItem): string {
    return item.id;
  }

  goToMyProfile(item: MenuItem): void {
    if (this.userInfoService.getUser()) {
      this.router.navigate([item.link]);
    } else {
      this.router.navigate(['login']);
    }
  }

  goToLink(item: MenuItem): void {
    this.router.navigate([item.link]);
  }

  /**
   * Perform user logout
   */
  logout(): void {
    // TODO Implement logout
    this.userInfoService.setUser(null);
    this.router.navigate(['home']);
  }

}