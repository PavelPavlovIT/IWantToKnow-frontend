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
import {TaskDetailsListeningComponent} from "./task-details-listening/task-details-listening.component";
import {TaskDetailsReadingComponent} from "./task-details-reading/task-details-reading.component";
import {TaskDetailsSpeakingComponent} from "./task-details-speaking/task-details-speaking.component";

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
    TaskDetailsSpeakingComponent
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() audioSource!: string | undefined;
  @Input() question!: string | null;
  @Input() categoryId!: string;
  @Input() typeTestId!: string;

}
