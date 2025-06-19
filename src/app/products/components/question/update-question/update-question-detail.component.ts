import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {Question, QuestionForm} from '../../../models/question';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Store} from '@ngrx/store';
import {LoggerService} from '../../../../core/services/logger.service';
import {
  NavigationHeaderCategoryComponent
} from "../../../../core/components/navigation-header-category/navigation-header-category.component";
import {Observable} from 'rxjs';
import {Category} from '../../../models/category';
import * as fromCategories from '../../../selectors/categories.selector';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {CorrectAnswer, CorrectAnswerForm} from "../../../models/correct-answer";
import {logger} from "../../../../reducers";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {CategoryPageActions} from "../../../actions/category-page.actions";
import {CorrectAnswerDialogComponent} from "../../correct-answer-dialog/correct-answer-dialog.component";
import {Guid} from "guid-typescript";
import {QuestionPageActions} from "../../../actions/question-page.actions";
import {CorrectAnswerPageActions} from "../../../actions/correct-answer-page.actions";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

import moment from 'moment';
import {formatToTimeZone} from 'date-fns-timezone';
import dayjs from 'dayjs';
import {
  IncorrectAnswersFromCorrectDialogComponent
} from "../../incorrect-answers-from-correct-dialog/incorrect-answers-from-correct-dialog.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { HeaderHierarchyOfCategoriesComponent } from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';

@Component({
  selector: 'app-update-question-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDivider,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HeaderHierarchyOfCategoriesComponent,
    MatTab,
    MatTabGroup,
  ],
  templateUrl: './update-question-detail.component.html',
  styleUrl: './update-question-detail.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UpdateQuestionDetailComponent implements OnInit {
  AddMode: boolean = false;
  categoriesHierarchy$: Observable<Category[]>;
  @Input() question!: Question;
  @Input() correctAnswers!: CorrectAnswer[];
  @Output() update = new EventEmitter<Question>();
  @Output() removeCorrectAnswer = new EventEmitter<CorrectAnswer>();
  updateQuestionForm!: FormGroup<QuestionForm>;
  readonly dialog = inject(MatDialog);
  readonly resultTitle = signal('');
  @Input() error!: string;
  showCorrectAnswerDialog: boolean = false;
  CorrectAnswerEn: string = '';
  CorrectAnswerEs: string = '';
  CorrectAnswerRu: string = '';
  private editMode: boolean = false;
  private editCorrectAnswer: CorrectAnswer | null = null;
  disabled: boolean = true

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService,
    private store: Store) {
    this.categoriesHierarchy$ = store.select(fromCategories.selectCategoriesHierarchy);
  }

  ngOnInit(): void {
    this.updateQuestionForm = new FormGroup<QuestionForm>({
      questionId: new FormControl<string>(this.question.questionId),
      categoryId: new FormControl<string>(this.question.categoryId),
      // keyS3: new FormControl<string>(this.question.keyS3),
      // expiredSignedUrlS3: new FormControl<string>(this.question.expiredSignedUrlS3),
      signedUrlS3: new FormControl<string>(this.question.signedUrlS3),
      titleEn: new FormControl<string>(this.question.titleEn),
      titleEs: new FormControl<string>(this.question.titleEs),
      titleRu: new FormControl<string>(this.question.titleRu),
      proofUrlEs: new FormControl<string>(this.question.proofUrlEs),
      proofCRCEs: new FormControl<string>(this.question.proofCRCEs),
      proofUrlRu: new FormControl<string>(this.question.proofUrlRu),
      proofCRCRu: new FormControl<string>(this.question.proofCRCRu),
      proofUrlEn: new FormControl<string>(this.question.proofUrlEn),
      proofCRCEn: new FormControl<string>(this.question.proofCRCEn),
      created: new FormControl<string>(new Date().toUTCString()),
      changed: new FormControl<string>(new Date().toUTCString()),
      correctAnswerEn: new FormControl<string>(this.question.correctAnswerEn),
      correctAnswerEs: new FormControl<string>(this.question.correctAnswerEs),
      correctAnswerRu: new FormControl<string>(this.question.correctAnswerRu),
    });

  }

  submitForm() {

    const question = this.updateQuestionForm.value as Question;
    question.created = '';
    question.changed = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    this.update.emit(question);
    this.document.location.href = `products/questions/` + question.categoryId;
  }

  RemoveComfirmationDialog(question: Question, correctAnswer: CorrectAnswer, language: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        Title: `Remove answer '${correctAnswer.titleEn}'`,
        Id: correctAnswer.correctAnswerId,
        Question: "Do you want remove?",
        route: '/products/update-question',
        params: correctAnswer.questionId
      },
      minWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.correctAnswers.forEach((item, index) => {
        if (item.correctAnswerId === correctAnswer.correctAnswerId) this.correctAnswers.splice(index, 1);
      });

      if (result) {
        this.store.dispatch(CorrectAnswerPageActions.removeCorrectAnswer({correctAnswer}));
      }
    });

    this.ngOnInit();
  }

  Goto(proofUrl: string) {
    window.open(proofUrl, '_blank');
  }

  AddCorrectAnswer(question: Question, language: string) {
    this.showCorrectAnswerDialog = !this.showCorrectAnswerDialog;
    this.CorrectAnswerRu = '';
    this.CorrectAnswerEn = '';
    this.CorrectAnswerEs = '';
  }

  SaveCorrectAnswer(language: string) {
    let answer = {
      correctAnswerId: '',
      questionId: this.question.questionId,
      titleEn: this.CorrectAnswerEn,
      titleEs: this.CorrectAnswerEs,
      titleRu: this.CorrectAnswerRu,
      created: new Date().toUTCString(),
      changed: new Date().toUTCString(),
      seconds: -1
    }
    if (!this.editMode) {
      answer.correctAnswerId = Guid.create().toString();
      const correctAnswer = answer;
      this.store.dispatch(CorrectAnswerPageActions.addCorrectAnswer({correctAnswer}));
      const questionId = answer.questionId;
      this.store.dispatch(CorrectAnswerPageActions.loadCorrectAnswersByQuestion({questionId}));
      this.showCorrectAnswerDialog = !this.showCorrectAnswerDialog;
    } else {
      answer.correctAnswerId = this.editCorrectAnswer!.correctAnswerId;
      answer.created = '';
      answer.changed = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
      const correctAnswer = answer;
      this.store.dispatch(CorrectAnswerPageActions.updateCorrectAnswer({correctAnswer}));

      let indexToUpdate = this.correctAnswers.findIndex(item => item.correctAnswerId === answer.correctAnswerId);
      this.correctAnswers[indexToUpdate] = answer;
      this.showCorrectAnswerDialog = !this.showCorrectAnswerDialog;
    }
    this.editMode = false;
    this.editCorrectAnswer = null;
  }

  UpdateCorrectAnswer(question: Question, correctAnswer: CorrectAnswer, en: string) {
    this.showCorrectAnswerDialog = !this.showCorrectAnswerDialog;
    this.CorrectAnswerRu = correctAnswer.titleRu;
    this.CorrectAnswerEn = correctAnswer.titleEn;
    this.CorrectAnswerEs = correctAnswer.titleEs;
    this.editCorrectAnswer = correctAnswer;
    this.editMode = true;
  }

}
