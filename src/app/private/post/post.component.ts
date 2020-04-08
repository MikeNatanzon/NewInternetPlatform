import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserInfoService } from '../../shared/services/user-info.service';
import { PostLabels } from './post.labels';

/**
 * Post page  allows the user to post articles of any length on the Platform, as well as provide citation for the claims, and note sources
 * of influence for the post.
 */
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends BaseComponent implements OnInit {

  constructor(
    protected userInfoService: UserInfoService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = PostLabels;
    // TODO Implment Post component
  }

}
