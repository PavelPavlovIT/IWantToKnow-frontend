import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardSubtitle} from "@angular/material/card";
import {AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer} from "microsoft-cognitiveservices-speech-sdk";
import {MatButton} from "@angular/material/button";
import {CorrectAnswer} from "../../../../../../models/correct-answer";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-question-and-clock-speaking-easy-level',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    MatCard,
    NgIf,
    MatButton,
    MatCardSubtitle
  ],
  templateUrl: './study-question-and-clock-speaking-easy-level.component.html',
  styleUrl: './study-question-and-clock-speaking-easy-level.component.scss'
})
export class StudyQuestionAndClockSpeakingEasyLevelComponent {
  isMobile!: boolean;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;
  @Input() Answers!: CorrectAnswer[];

  @Input() audioSource: string | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  name : string = 'Speech To Text';
  @Input() isTimer!: boolean;

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
