import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';
import { Store } from '@ngrx/store';
import * as fromCategories from '../../../selectors/categories.selector';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CategoryPageActions } from '../../../actions/category-page.actions';
import { LoggerService } from '../../../../core/services/logger.service';
import { CategoryApiActions } from '../../../actions/category-api.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-category-page',
  standalone: true,
  imports: [CommonModule, DetailCategoryComponent],
  template: `<app-detail-category
    [category]="(category$ | async)!"
    (update)="updateCategory($event)"
  ></app-detail-category> `,
  styleUrl: './selected-category-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedCategoryPageComponent {
  category$: Observable<Category>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService,
    private store: Store,
    private router: Router
  ) {
    this.category$ = store.select(
      fromCategories.selectSelectedCategory
    ) as Observable<Category>;
  }

  updateCategory(category: Category) {
    this.store.dispatch(CategoryPageActions.updateCategory({ category }));
    this.document.location.href = `products/categories/` + category.parentId;
    //this.router.navigate(['products/add-category/00000000-0000-0000-0000-000000000000']);
  }
}
