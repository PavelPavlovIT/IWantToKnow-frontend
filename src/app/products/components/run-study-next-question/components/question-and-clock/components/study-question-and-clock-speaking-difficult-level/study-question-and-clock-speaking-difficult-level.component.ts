import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";
import {CorrectAnswer} from "../../../../../../models/correct-answer";
import {MatCardSubtitle} from "@angular/material/card";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-question-and-clock-speaking-difficult-level',
  standalone: true,
  imports: [
    NgClass,
    MatCardSubtitle
  ],
  templateUrl: './study-question-and-clock-speaking-difficult-level.component.html',
  styleUrl: './study-question-and-clock-speaking-difficult-level.component.scss'
})
export class StudyQuestionAndClockSpeakingDifficultLevelComponent implements OnInit{
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
