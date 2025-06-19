import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {Guid} from 'guid-typescript';
import {Observable} from 'rxjs';
import {Category, CategoryForm} from '../../../models/category';
import {Store} from '@ngrx/store';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LoggerService} from '../../../../core/services/logger.service';
import {MatDivider} from '@angular/material/divider';
import {
  NavigationHeaderCategoryComponent
} from "../../../../core/components/navigation-header-category/navigation-header-category.component";
import {MatGridListModule} from '@angular/material/grid-list';
import * as fromCategories from '../../../selectors/categories.selector';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  HeaderHierarchyOfCategoriesComponent
} from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';

@Component({
  selector: 'app-detail-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDivider,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    HeaderHierarchyOfCategoriesComponent,
    MatTab,
    MatTabGroup,

  ],
  templateUrl: './detail-category.component.html',
  styleUrl: './detail-category.component.scss',
})
export class DetailCategoryComponent implements OnInit {
  // categoriesHierarchy$: Observable<Category[]>;
  @Input() category!: Category;
  @Output() update = new EventEmitter<Category>();
  updateCategoryForm!: FormGroup<CategoryForm>;

  constructor(
    private logger: LoggerService
    // private store: Store
  ) {
    // this.categoriesHierarchy$ = store.select(fromCategories.selectCategoriesHierarchy);
  }

  ngOnInit(): void {
    this.updateCategoryForm = new FormGroup<CategoryForm>({
      categoryId: new FormControl<string>(this.category.categoryId),
      parentId: new FormControl<string>(this.category.parentId),
      nameEn: new FormControl<string>(this.category.nameEn),
      descriptionEn: new FormControl<string>(this.category.descriptionEn),
      nameEs: new FormControl<string>(this.category.nameEs),
      descriptionEs: new FormControl<string>(this.category.descriptionEs),
      nameRu: new FormControl<string>(this.category.nameRu),
      descriptionRu: new FormControl<string>(this.category.descriptionRu),
      orderBy: new FormControl<number>(this.category.orderBy),
      countQuestions: new FormControl<number>(this.category.countQuestions),
      hidden: new FormControl<boolean>(this.category.hidden),
      reverse: new FormControl<boolean>(this.category.reverse),

      testResultListen: new FormControl<string>(this.category.testResultListen),
      testResultRead: new FormControl<string>(this.category.testResultRead),
      testResultSpeaking: new FormControl<string>(this.category.testResultSpeaking),

    });
  }

  submitForm() {
    const category = this.updateCategoryForm.value as Category;
    this.update.emit(category);
  }
}
