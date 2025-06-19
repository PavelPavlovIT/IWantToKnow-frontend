import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { CategoryPageActions } from '../../../actions/category-page.actions';
import { Category, CategoryForm } from '../../../models/category';
import * as fromCategories from '../../../selectors/categories.selector';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Guid } from 'guid-typescript';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { SelectedCategoryPageComponent } from '../selected-category-page/selected-category-page.component';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    SelectedCategoryPageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-selected-category-page></app-selected-category-page>',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent implements OnDestroy, OnInit {
  actionsSubscription: Subscription;

  /**
   *
   */
  constructor(
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.actionsSubscription = route.params
      .pipe(
        map((params) =>
          CategoryPageActions.selectCategory({ id: params['id'] })
        )
      )
      .subscribe((action) => store.dispatch(action));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
