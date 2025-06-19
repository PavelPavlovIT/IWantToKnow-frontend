import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {AccountService} from "../../../../../../account/services";

@Component({
    selector: 'app-category-with-test-and-study',
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCardSubtitle,
        NgClass,
        NgIf
    ],
    templateUrl: './category-with-test-and-study.component.html',
    styleUrl: './category-with-test-and-study.component.scss'
})
export class CategoryWithTestAndStudyComponent {
    IsMobile: boolean = false;
    @Input() CategoryId!: string;
    @Input() Title!: string;
    @Input() Description!: string;
    @Input() TestResultSpeak: string = '';
    @Input() TestResultListen: string = '';
    @Input() TestResultRead: string = '';
    @Input() Reverse!: boolean;
    isExpired: boolean = false;

    private _bottomSheetTest = inject(MatBottomSheet);
    private _bottomSheetStudy = inject(MatBottomSheet);

    constructor(private accountService: AccountService) {
        this.accountService.isSignedIn().forEach((userInfo) => {
            this.isExpired = userInfo == null ? false : userInfo.expired;
        });
    }

    openTestBottomSheet(categoryId: string, nameRu: string, reverse: boolean) {
        const expired = this.isExpired;
        this._bottomSheetTest.open(BottomSheetOverviewTestSheet, {
            data: {
                categoryId,
                nameRu,
                reverse,
                expired
            },
        });
    }

    openStudyBottomSheet(categoryId: string, nameRu: string, reverse: boolean) {
        const expired = this.isExpired;
        this._bottomSheetStudy.open(BottomSheetOverviewStudySheet, {
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
    selector: 'study-sheet',
    templateUrl: 'study-sheet.html',
    standalone: true,
    imports: [MatListModule, RouterLink, MatCard, NgIf],
})

export class BottomSheetOverviewStudySheet{
    expired: boolean = false;
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

export class BottomSheetOverviewTestSheet{
    expired: boolean = false;
    private _bottomSheetRef =
        inject<MatBottomSheetRef<BottomSheetOverviewTestSheet>>(MatBottomSheetRef);
    readonly data = inject<ExamData>(MAT_BOTTOM_SHEET_DATA);

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
