import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserInfoService } from '../../services/user-info.service';
import { CommonLabels } from '../../labels/common.labels';

/*@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BaseComponent),
    multi: true,
  }]
})*/
export abstract class BaseComponent implements OnInit {

  public language: string;
  public commonLabels: object;
  public labelsFile: object;

  constructor(
    protected userInfoService: UserInfoService
  ) {
    this.language = this.userInfoService.language;
    this.commonLabels = CommonLabels;
  }

  ngOnInit() {
  }

}
