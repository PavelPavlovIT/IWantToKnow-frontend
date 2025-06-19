import {Component, inject, OnInit} from '@angular/core';
import {Category} from "../../../models/category";
import {ResponsiveService} from "../../../../core/services/responsive-service";
import {CategoriesService} from "../../../services/category.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {
  HeaderHierarchyOfCategoriesComponent
} from "../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {CategoryWithExamComponent} from "./components/category-with-exam/category-with-exam.component";
import {CategoryOnlyTitleComponent} from "./components/category-only-title/category-only-title.component";
import {
  CategoryWithTestAndStudyComponent
} from "./components/category-with-test-and-study/category-with-test-and-study.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [
    HeaderHierarchyOfCategoriesComponent,
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    NgClass,
    NgForOf,
    NgIf,
    CategoryWithExamComponent,
    CategoryOnlyTitleComponent,
    CategoryWithTestAndStudyComponent,
    MatProgressSpinner
  ],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss'
})
export class MainListComponent implements OnInit{
  isLoading: boolean = true
  parentId: string = '';
  categories: Category[] = [];
  isMobile: boolean = false;
  private _bottomSheetStudy = inject(MatBottomSheet);
  private _bottomSheetTest = inject(MatBottomSheet);
  constructor(
    private responsiveService: ResponsiveService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.parentId = params['id'] === 'undefined' ? '' : params['id'];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isMobile = this.responsiveService.isMobile;
    this.categoryService.loadCategories(this.parentId)
      .subscribe(value => {
        this.categories = value;
        this.isLoading = false;
      });
  }
/*
  openExamBottomSheet(categoryId: string, nameRu: string, reverse: boolean) {

  }

  openTestBottomSheet(categoryId: string, nameRu: string, reverse: boolean) {
    this._bottomSheetStudy.open(BottomSheetOverviewTestSheet, {
      data: {
        categoryId,
        nameRu,
        reverse,
      },
    });
  }

  openStudyBottomSheet(categoryId: string, nameRu: string, reverse: boolean) {
    this._bottomSheetStudy.open(BottomSheetOverviewStudySheet, {
      data: {
        categoryId,
        nameRu,
        reverse,
      },
    });
  }
  */

}
/*
export interface ExamData {
  categoryId: string;
  nameRu: string;
  reverse: boolean;
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


*/
