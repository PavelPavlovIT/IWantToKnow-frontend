import {Component, inject, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {AccountService} from "../../../../../../account/services";

@Component({
  selector: 'app-category-with-exam',
  standalone: true,
  imports: [
    MatCard,
    NgClass,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    NgIf
  ],
  templateUrl: './category-with-exam.component.html',
  styleUrl: './category-with-exam.component.scss'
})
export class CategoryWithExamComponent {
  IsMobile: boolean = false;
  @Input() CategoryId!: string;
  @Input() Title!: string;
  @Input() Description!: string;
  @Input() TestResultSpeak: string = '';
  @Input() TestResultListen: string = '';
  @Input() TestResultRead: string = '';
  @Input() Reverse!: boolean;
  isExpired: boolean = false;

  private _bottomSheetExam = inject(MatBottomSheet);

  constructor(private accountService: AccountService) {
    this.accountService.isSignedIn().forEach((userInfo) => {
      this.isExpired = userInfo == null ? false : userInfo.expired;
    });
  }

  OpenExamBottomSheet(categoryId: string, nameRu: string, reverse: boolean) {
    const expired = this.isExpired;
    this._bottomSheetExam.open(BottomSheetOverviewExamSheet, {
      data: {
        categoryId,
        nameRu,
        reverse,
        expired
      },
    });
  }
}

export interface ExamData {
  categoryId: string;
  nameRu: string;
  reverse: boolean;
  expired: boolean;
}

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

