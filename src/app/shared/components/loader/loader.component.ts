import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

/**
 * Loader component
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  faSpinnerIcon = faSpinner;

  isLoading: Subject<boolean>;

  constructor(
    private loaderService: LoaderService
  ) {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit() {
  }

}
