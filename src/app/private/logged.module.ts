import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../shared/pipes/pipe.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InvestmentComponent } from './investment/investment.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'investment',
    component: InvestmentComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'comment',
    component: CommentComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    InvestmentComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PipeModule,
    RouterModule.forChild(routes)
  ]
})
export class LoggedModule {
}
