import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {CorrectAnswer} from "../../../../../../models/correct-answer";
import {MatButton} from "@angular/material/button";
import {MatCardSubtitle} from "@angular/material/card";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-question-and-clock-speaking-medium-level',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    MatButton,
    MatCardSubtitle
  ],
  templateUrl: './study-question-and-clock-speaking-medium-level.component.html',
  styleUrl: './study-question-and-clock-speaking-medium-level.component.scss'
})
export class StudyQuestionAndClockSpeakingMediumLevelComponent {
  @Input() isTimer!: boolean;
  isMobile!: boolean;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;
  @Input() Answers!: CorrectAnswer[];

  @Input() audioSource: string | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  Play() {
    this.audio.nativeElement.src = this.audioSource!;
    this.audio.nativeElement.play();
  }

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

}
