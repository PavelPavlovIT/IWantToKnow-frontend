import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { CategoryPageActions } from '../../../actions/category-page.actions';
import { Guid } from 'guid-typescript';
import { Category, CategoryForm } from '../../../models/category';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../../../core/services/logger.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { NavigationHeaderCategoryComponent } from '../../../../core/components/navigation-header-category/navigation-header-category.component';
import { Observable } from 'rxjs';
import * as fromCategories from '../../../selectors/categories.selector';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { HeaderHierarchyOfCategoriesComponent } from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    HeaderHierarchyOfCategoriesComponent,
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  parentId: string = '';
  //categoriesHierarchy$: Observable<Category[]>;
  addCategoryForm = new FormGroup<CategoryForm>({
    categoryId: new FormControl<string>(Guid.create().toString()),
    parentId: new FormControl<string>(''),
    nameEn: new FormControl<string>(''),
    descriptionEn: new FormControl<string>(''),
    nameEs: new FormControl<string>(''),
    descriptionEs: new FormControl<string>(''),
    nameRu: new FormControl<string>(''),
    descriptionRu: new FormControl<string>(''),
    orderBy: new FormControl<number>(0),
    countQuestions: new FormControl<number>(0),
    hidden: new FormControl<boolean>(false),
    reverse: new FormControl<boolean>(false),
    testResultSpeaking: new FormControl<string>(''),
    testResultListen: new FormControl<string>(''),
    testResultRead: new FormControl<string>(''),
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    // private store: Store
  ) {
    this.route.params.subscribe((params) => {
      this.parentId = params['id'];
    });
    // this.categoriesHierarchy$ = store.select(fromCategories.selectCategoriesHierarchy);
  }

  ngOnInit(): void {
    // this.logger.Inforamtion("add");
    const categoryId = this.parentId;
    // this.store.dispatch(
    //   CategoryPageActions.loadCategoryHierarchy({ categoryId })
    // );
  }

  submitForm() {
    const category = this.addCategoryForm.value as Category;
    category.parentId = this.parentId === undefined ? '' : this.parentId;
    // this.store.dispatch(CategoryPageActions.addCategory({ category }));
    this.document.location.href = `products/categories/` + category.parentId;
  }
}
