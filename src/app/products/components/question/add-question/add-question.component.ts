import {CommonModule, DOCUMENT} from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Guid} from 'guid-typescript';
import {LoggerService} from '../../../../core/services/logger.service';
import {CategoryPageActions} from '../../../actions/category-page.actions';
import {Category} from '../../../models/category';
import {Question, QuestionForm} from '../../../models/question';
import {QuestionPageActions} from '../../../actions/question-page.actions';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {Observable} from 'rxjs';
import * as fromCategories from '../../../selectors/categories.selector';
import {
  NavigationHeaderCategoryComponent
} from '../../../../core/components/navigation-header-category/navigation-header-category.component';
import moment from "moment/moment";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import { HeaderHierarchyOfCategoriesComponent } from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';

@Component({
  selector: 'app-add-question',
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
    MatTab,
    MatTabGroup
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent implements OnInit {
  categoryId: string = '';
  categoriesHierarchy$: Observable<Category[]>;
  addQuestionForm = new FormGroup<QuestionForm>({
    questionId: new FormControl<string>(Guid.create().toString()),
    categoryId: new FormControl<string>(''),
    // keyS3: new FormControl<string>(''),
    // expiredSignedUrlS3: new FormControl<string>(''),
    signedUrlS3: new FormControl<string>(''),
    titleEn: new FormControl<string>(''),
    titleEs: new FormControl<string>(''),
    titleRu: new FormControl<string>(''),
    proofUrlEn: new FormControl<string>(''),
    proofCRCEn: new FormControl<string>(''),
    proofUrlRu: new FormControl<string>(''),
    proofCRCRu: new FormControl<string>(''),
    proofUrlEs: new FormControl<string>(''),
    proofCRCEs: new FormControl<string>(''),
    created: new FormControl<string>(new Date().toUTCString()),
    changed: new FormControl<string>(new Date().toUTCString()),
    correctAnswerEn: new FormControl<string>(''),
    correctAnswerEs: new FormControl<string>(''),
    correctAnswerRu: new FormControl<string>(''),
  });
  showCorrectAnswerDialog: boolean = true;
  CorrectAnswerEn: string = '';
  CorrectAnswerEs: string = '';
  CorrectAnswerRu: string = '';
  protected valueFromClipboard: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });
    this.categoriesHierarchy$ = store.select(fromCategories.selectCategoriesHierarchy);
  }

  ngOnInit(): void {
    const categoryId = this.categoryId;
    this.store.dispatch(
      CategoryPageActions.loadCategoryHierarchy({categoryId})
    );
  }


  submitForm() {
    const question = this.addQuestionForm.value as Question;
    question.created = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    question.categoryId = this.categoryId === undefined ? '' : this.categoryId;
    this.store.dispatch(QuestionPageActions.addQuestion({question}));
    this.document.location.href = `products/questions/` + this.categoryId;
  }

  PasteFromClipboard() {
    navigator.clipboard.readText().then(
      text => {
        this.valueFromClipboard = text;
      }
    )
      .catch(error => {
          console.error('Cannot read clipboard text: ', error);
        }
      );
  }
}
