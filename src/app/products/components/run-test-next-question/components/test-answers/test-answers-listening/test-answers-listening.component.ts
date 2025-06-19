import {Component, Input, OnInit} from '@angular/core';
import {ResponsiveService} from "../../../../../../core/services/responsive-service";
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

@Component({
  selector: 'app-test-answers-listening',
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
  templateUrl: './test-answers-listening.component.html',
  styleUrl: './test-answers-listening.component.scss'
})
export class TestAnswersListeningComponent implements OnInit {
  isMobile!: boolean;
  @Input() todo!: string[];
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
