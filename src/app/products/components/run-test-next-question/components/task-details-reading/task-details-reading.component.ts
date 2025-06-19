import {Component, Input} from '@angular/core';
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-details-reading',
  standalone: true,
  imports: [
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    NgIf
  ],
  templateUrl: './task-details-reading.component.html',
  styleUrl: './task-details-reading.component.scss'
})
export class TaskDetailsReadingComponent {
  @Input() type_task_id: string | null = null;
  @Input() type_task_title: string | null = null;
  @Input() type_task_value: string | null = null;
  @Input() task_value: string | null = null;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;
  @Input() isMobile!: boolean;
}
