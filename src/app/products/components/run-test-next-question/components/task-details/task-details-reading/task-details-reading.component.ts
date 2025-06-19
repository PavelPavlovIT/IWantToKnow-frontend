import {Component, Input, OnInit} from '@angular/core';
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";
import {ResponsiveService} from "../../../../../../core/services/responsive-service";

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
export class TaskDetailsReadingComponent implements OnInit {
  @Input() type_task_id: string | null = null;
  @Input() type_task_title: string | null = null;
  @Input() type_task_value: string | null = null;
  @Input() task_value: string | null = null;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;
  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

}
