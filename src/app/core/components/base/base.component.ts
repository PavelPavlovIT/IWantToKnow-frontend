import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(
    protected logger: LoggerService,
    // protected store: Store,
    protected route: ActivatedRoute
  ) {
  }

}
