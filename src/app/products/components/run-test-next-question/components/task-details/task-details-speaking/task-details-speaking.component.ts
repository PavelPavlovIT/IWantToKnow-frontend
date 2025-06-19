import {Component, Input, OnInit} from '@angular/core';
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";
import {ResponsiveService} from "../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-task-details-speaking',
  standalone: true,
    imports: [
        MatCardSubtitle,
        MatCardTitle,
        MatDivider,
        NgIf
    ],
  templateUrl: './task-details-speaking.component.html',
  styleUrl: './task-details-speaking.component.scss'
})
export class TaskDetailsSpeakingComponent implements OnInit {
  @Input() type_task_title!: string;
  @Input() type_task_value!: string;
  @Input() task_value!: string;
  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }


}
