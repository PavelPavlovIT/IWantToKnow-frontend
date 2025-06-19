import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {
  QuestionAndClockListeningComponent
} from "./question-and-clock-listening/question-and-clock-listening.component";
import {QuestionAndClockReadingComponent} from "./question-and-clock-reading/question-and-clock-reading.component";
import {QuestionAndClockSpeakingComponent} from "./question-and-clock-speaking/question-and-clock-speaking.component";
import {CorrectAnswer} from "../../../../models/correct-answer";

@Component({
  selector: 'app-question-and-clock',
  standalone: true,
  imports: [
    NgSwitchCase,
    QuestionAndClockListeningComponent,
    QuestionAndClockReadingComponent,
    QuestionAndClockSpeakingComponent,
    NgSwitch
  ],
  templateUrl: './question-and-clock.component.html',
  styleUrl: './question-and-clock.component.scss'
})
export class QuestionAndClockComponent {
  @Input() typeTestId!: string;
  @Input() question!: string | null;
  @Input() audioSource: string | undefined;
  @Input() Answers!: CorrectAnswer[];
}
