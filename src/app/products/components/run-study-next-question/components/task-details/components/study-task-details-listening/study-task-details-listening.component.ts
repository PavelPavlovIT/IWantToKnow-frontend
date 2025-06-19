import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-task-details-listening',
  standalone: true,
  imports: [
    MatButton,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatIcon,
    NgIf
  ],
  templateUrl: './study-task-details-listening.component.html',
  styleUrl: './study-task-details-listening.component.scss'
})
export class StudyTaskDetailsListeningComponent implements OnInit {
  @Input() type_task_id: string | null = null;
  @Input() type_task_title: string | null = null;
  @Input() type_task_value: string | null = null;
  @Input() task_value: string | null = null;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;

  @Input() audioSource: string | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

  Play() {
    this.audio.nativeElement.src = this.audioSource!;
    this.audio.nativeElement.play();
  }
}
