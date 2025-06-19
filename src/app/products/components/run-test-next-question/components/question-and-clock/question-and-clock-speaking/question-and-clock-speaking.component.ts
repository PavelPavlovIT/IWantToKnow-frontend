import {Component, Input, OnInit} from '@angular/core';


import MicrophoneStream from 'microphone-stream';
import {AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import {MatCard, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import {CorrectAnswer} from "../../../../../models/correct-answer";
import {ResponsiveService} from "../../../../../../core/services/responsive-service";
import {ClockComponent} from "../../../../../../core/components/clock/clock.component";

let micStream: any = null;

@Component({
  selector: 'app-question-and-clock-speaking',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    NgIf,
    MatCardSubtitle,
    NgClass,
    ClockComponent
  ],
  templateUrl: './question-and-clock-speaking.component.html',
  styleUrl: './question-and-clock-speaking.component.scss'
})
export class QuestionAndClockSpeakingComponent implements OnInit {
  @Input() question_value!: string | null;
  @Input() Answers!: CorrectAnswer[];
  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

}
