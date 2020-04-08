import { Component, Input, OnInit } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Error component to show an error with a custom message
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() errorMessage: string;

  timesCircleIcon = faTimesCircle;

  constructor() {
  }

  ngOnInit() {
  }

}
