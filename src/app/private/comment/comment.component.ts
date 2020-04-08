import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserInfoService } from '../../shared/services/user-info.service';
import { CommentLabels } from './comment.labels';

/**
 * Comment page allows the user to comment on posts on the Platform as well as posts/articles/etc. on external webpages. There will be 3
 * tabs to input the post to which the user responds
 * (1) URL tab for external webpages. The Page will then automatically parse the URL and allow the user to respond sentence by sentence.
 * (2) a tab where the user can manually enter the text data he or she is responding to. The Page will then parse the text similar to tab 1.
 * (3) a tab for posts within the Platform (based on a search field/URL). The Page will identify the underlying data structure and allow the
 * user to comment.
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BaseComponent implements OnInit {

  constructor(
    protected userInfoService: UserInfoService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = CommentLabels;
    // TODO Implment Comment component
  }

}
