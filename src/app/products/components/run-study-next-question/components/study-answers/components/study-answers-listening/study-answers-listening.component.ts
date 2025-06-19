import {Component, Input, OnInit} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgClass, NgIf} from "@angular/common";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-answers-listening',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatCardSubtitle,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    NgIf,
    NgClass
  ],
  templateUrl: './study-answers-listening.component.html',
  styleUrl: './study-answers-listening.component.scss'
})
export class StudyAnswersListeningComponent implements OnInit{
  @Input() todo!: string[];
  isMobile!: boolean;
  @Input() isSuccess!: boolean;
  @Input() isError!: boolean;
  @Input() done!: string[];

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //this.next(true);
    }
  }
}
