import {Component, Input, OnInit} from '@angular/core';
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-task-details-speaking-difficult-level',
  standalone: true,
    imports: [
        MatCardSubtitle,
        MatCardTitle,
        MatDivider,
        NgIf
    ],
  templateUrl: './study-task-details-speaking-difficult-level.component.html',
  styleUrl: './study-task-details-speaking-difficult-level.component.scss'
})
export class StudyTaskDetailsSpeakingDifficultLevelComponent implements OnInit{
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

  // Play() {
  //   console.log(this.audioSource);
  //   this.audio.nativeElement.src = this.audioSource!;
  //   this.audio.nativeElement.play();
  // }
}
