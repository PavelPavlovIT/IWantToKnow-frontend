import {
  ChangeDetectionStrategy,
  Component, Inject,
  inject,
  Input,
  model,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Question } from '../../../models/question';
import { CommonModule, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
  MatCardSubtitle, MatCardHeader,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';
import { Store } from '@ngrx/store';
import { LoggerService } from '../../../../core/services/logger.service';
import { CategoryPageActions } from '../../../actions/category-page.actions';
import * as fromCategories from '../../../selectors/categories.selector';
import {
  NavigationHeaderCategoryComponent
} from '../../../../core/components/navigation-header-category/navigation-header-category.component';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { QuestionPageActions } from '../../../actions/question-page.actions';
import { environment } from "../../../../environments/environment";
import { MatToolbar } from "@angular/material/toolbar";
import { AccountService } from "../../../../account/services";
import { HeaderHierarchyOfCategoriesComponent } from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';

interface DialogData {
  QuestionId: string;
  Name: string;
}

@Component({
  selector: 'app-list-question',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgFor,
    NgIf,
    RouterModule,
    HeaderHierarchyOfCategoriesComponent
  ],
  templateUrl: './list-question.component.html',
  styleUrl: './list-question.component.scss',
})
export class ListQuestionComponent implements OnDestroy, OnInit {
  @Input() questions!: Question[];
  categoryId: string = '';
  categoriesHierarchy$: Observable<Category[]>;
  readonly dialog = inject(MatDialog);
  private lang: string ='ru';
  currentRoute: string = "#";
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private accountService: AccountService,
    private logger: LoggerService,
    private store: Store,
    private route: ActivatedRoute
  ) {

    this.currentRoute = 'products\\'+this.route.snapshot.url.map(segment => segment.path).join('/');;

    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });

    this.categoriesHierarchy$ = store.select(
      fromCategories.selectCategoriesHierarchy
    );
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    const categoryId = this.categoryId;
    this.store.dispatch(
      CategoryPageActions.loadCategoryHierarchy({ categoryId })
    );
  }

  getTitle(question: Question): string {
    switch (this.lang) {
      case 'es':
        return question.titleEs;
      case 'ru':
        return question.titleRu;
      default:
        return question.titleEn;
    }
  }

  RemoveComfirmationDialog(question: Question) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { QuestionId: question.questionId, Name: question.titleEn },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.logger.Inforamtion('The dialog was closed');
      if (result) {
        this.store.dispatch(QuestionPageActions.removeQuestion({ question }));
      }
    });
  }

  GetUrl(question: Question): string {
    if (this.lang === 'en') {
      window.open(question.proofUrlEn, '_blank');
    }
    if (this.lang === 'es') {
      window.open(question.proofUrlEs, '_blank');
    }
    window.open(question.proofUrlRu, '_blank');
    return '#';
  }

  Goto(question: Question) {
    if (this.lang === 'en') {
      window.open(question.proofUrlEn, '_blank');
    }
    if (this.lang === 'es') {
      window.open(question.proofUrlEs, '_blank');
    }
    if (this.lang === 'ru') {
      window.open(question.proofUrlRu, '_blank');
    }
  }
}

@Component({
  selector: 'remove-confirmation-dialog',
  templateUrl: 'remove-confirmation-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly questionName = model(this.data.Name);
  readonly name = this.data.Name;
}
