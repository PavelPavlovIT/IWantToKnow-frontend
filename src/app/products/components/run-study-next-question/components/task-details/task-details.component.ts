import {Component, Input} from '@angular/core';
import {
    HeaderHierarchyOfCategoriesComponent
} from "../../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDivider} from "@angular/material/divider";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {
    TaskDetailsListeningComponent
} from "../../../run-test-next-question/components/task-details/task-details-listening/task-details-listening.component";
import {
    TaskDetailsReadingComponent
} from "../../../run-test-next-question/components/task-details/task-details-reading/task-details-reading.component";
import {
  StudyTaskDetailsReadingComponent
} from "./components/study-task-details-reading/study-task-details-reading.component";
import {
  StudyTaskDetailsListeningComponent
} from "./components/study-task-details-listening/study-task-details-listening.component";
import {
  StudyTaskDetailsSpeakingEasyLevelComponent
} from "./components/study-task-details-speaking-easy-level/study-task-details-speaking-easy-level.component";
import {
  StudyTaskDetailsSpeakingMediumLevelComponent
} from "./components/study-task-details-speaking-medium-level/study-task-details-speaking-medium-level.component";
import {
  StudyTaskDetailsSpeakingDifficultLevelComponent
} from "./components/study-task-details-speaking-difficult-level/study-task-details-speaking-difficult-level.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    HeaderHierarchyOfCategoriesComponent,
    MatAccordion,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NgSwitchCase,
    TaskDetailsListeningComponent,
    TaskDetailsReadingComponent,
    NgSwitch,
    StudyTaskDetailsReadingComponent,
    StudyTaskDetailsListeningComponent,
    StudyTaskDetailsSpeakingEasyLevelComponent,
    StudyTaskDetailsSpeakingMediumLevelComponent,
    StudyTaskDetailsSpeakingDifficultLevelComponent
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() categoryId!: string;
  @Input() typeTestId!: string;
  @Input({transform: (value: string | undefined): string => value || ''}) audioSource!: string;
  @Input({transform: (value: string | null): string => value || ''}) question!: string;

  isMobile!: boolean;

}
