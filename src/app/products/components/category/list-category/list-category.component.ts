import {
  ChangeDetectionStrategy,
  Component, Inject,
  inject,
  Input,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import {CategoryPageActions} from '../../../actions/category-page.actions';
import * as fromCategories from '../../../selectors/categories.selector';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {
  MatCard,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgFor} from '@angular/common';
import {NgIf} from '@angular/common';
import {Category} from '../../../models/category';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {LoggerService} from '../../../../core/services/logger.service';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import {Dictionary} from '@ngrx/entity';
import {map, Observable, Subscription} from 'rxjs';
import {
  NavigationHeaderCategoryComponent
} from '../../../../core/components/navigation-header-category/navigation-header-category.component';
import {AccountService} from "../../../../account/services";
import {
  HeaderHierarchyOfCategoriesComponent
} from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';
import {ResponsiveService} from '../../../../core/services/responsive-service';
import {LoadingService} from '../../../../core/services/loading-service ';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {CategoriesService} from "../../../services/category.service";

interface DialogData {
  CategoryId: string;
  Name: string;
}

export interface ExamData {
  categoryId: string;
  nameRu: string;
  reverse: boolean;
}


@Component({
  selector: 'app-list-category',
  standalone: true,
  // preserveWhitespaces: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgFor,
    NgIf,
    RouterModule,
    HeaderHierarchyOfCategoriesComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCategoryComponent implements OnInit {
  lang: string | undefined = "ru";
  categories: Category[] = [];
  parentId: string = '';
  isMobile: boolean = false;
  currentCategoryId: string = "";
  // categoriesHierarchy$: Observable<Category[]>;
  // readonly dialog = inject(MatDialog);


  /**
   *
   */
  constructor(
    private categoryService: CategoriesService,
    private logger: LoggerService,
    private store: Store,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private responsiveService: ResponsiveService,
  ) {
    // this.route.params.subscribe((params) => {
    //   this.parentId = params['id'] === 'undefined' ? '' : params['id'];
    // });
    //
    // this.categoriesHierarchy$ = store.select(fromCategories.selectCategoriesHierarchy);
    // this.accountService.UserInfo$.subscribe(value => {
    //   this.lang = value?.language;
    // });

  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  }
  //
  ngOnInit(): void {
    // this.isMobile = this.responsiveService.isMobile;
    // this.currentCategoryId = this.parentId;
    // const categoryId = this.parentId;
    // console.log("ngOnInit");
    // this.categoryService.loadCategories(this.parentId)
    //   .subscribe(value => {
    //     this.categories = value;
    //   });

    // this.store.dispatch(
    //   CategoryPageActions.loadCategoryHierarchy({categoryId})
    // );
  }

  // private _bottomSheetExam = inject(MatBottomSheet);
  // private _bottomSheetTest = inject(MatBottomSheet);
  // private _bottomSheetStudy = inject(MatBottomSheet);

  openExamBottomSheet(
    categoryId: string,
    nameRu: string,
    reverse: boolean
  ): void {
    // this._bottomSheetExam.open(BottomSheetOverviewExamSheet, {
    //   data: {
    //     categoryId,
    //     nameRu,
    //     reverse,
    //   },
    // });
  }

  openTestBottomSheet(
    categoryId: string,
    nameRu: string,
    reverse: boolean
  ): void {
    // this._bottomSheetTest.open(BottomSheetOverviewTestSheet, {
    //   data: {
    //     categoryId,
    //     nameRu,
    //     reverse,
    //   },
    // });
  }

  openStudyBottomSheet(
    categoryId: string,
    nameRu: string,
    reverse: boolean
  ): void {
    console.log(categoryId, nameRu, reverse);
    // this._bottomSheetStudy.open(BottomSheetOverviewStudySheet, {
    //   data: {
    //     categoryId,
    //     nameRu,
    //     reverse,
    //   },
    // });
  }
}
/*
@Component({
  selector: 'exam-sheet',
  templateUrl: 'exam-sheet.html',
  standalone: true,
  imports: [MatListModule, RouterLink, MatCard, NgIf],
})
export class BottomSheetOverviewExamSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewExamSheet>>(MatBottomSheetRef);
  readonly data = inject<ExamData>(MAT_BOTTOM_SHEET_DATA);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}


@Component({
  selector: 'test-sheet',
  templateUrl: 'test-sheet.html',
  standalone: true,
  imports: [MatListModule, RouterLink, MatCard, NgIf],
})
export class BottomSheetOverviewTestSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewTestSheet>>(MatBottomSheetRef);
  readonly data = inject<ExamData>(MAT_BOTTOM_SHEET_DATA);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'study-sheet',
  templateUrl: 'study-sheet.html',
  standalone: true,
  imports: [MatListModule, RouterLink, MatCard, NgIf],
})

export class BottomSheetOverviewStudySheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewStudySheet>>(MatBottomSheetRef);
  readonly data = inject<ExamData>(MAT_BOTTOM_SHEET_DATA);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
*/
