import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {
  StudyQuestionAndClockReadingComponent
} from "./components/study-question-and-clock-reading/study-question-and-clock-reading.component";
import {
  StudyQuestionAndClockListeningComponent
} from "./components/study-question-and-clock-listening/study-question-and-clock-listening.component";
import {
  StudyQuestionAndClockSpeakingEasyLevelComponent
} from "./components/study-question-and-clock-speaking-easy-level/study-question-and-clock-speaking-easy-level.component";
import {
  StudyQuestionAndClockSpeakingMediumLevelComponent
} from "./components/study-question-and-clock-speaking-medium-level/study-question-and-clock-speaking-medium-level.component";
import {
  StudyQuestionAndClockSpeakingDifficultLevelComponent
} from "./components/study-question-and-clock-speaking-difficult-level/study-question-and-clock-speaking-difficult-level.component";
import {CorrectAnswer} from "../../../../models/correct-answer";

@Component({
  selector: 'app-question-and-clock',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    StudyQuestionAndClockReadingComponent,
    StudyQuestionAndClockListeningComponent,
    StudyQuestionAndClockSpeakingEasyLevelComponent,
    StudyQuestionAndClockSpeakingMediumLevelComponent,
    StudyQuestionAndClockSpeakingDifficultLevelComponent
  ],
  templateUrl: './question-and-clock.component.html',
  styleUrl: './question-and-clock.component.scss'
})
export class QuestionAndClockComponent {
  @Input() typeTestId!: string;
  @Input() isMobile: boolean = false;
  @Input({transform: (value: string | undefined): string => value ?? ''}) audioSource: string = '';
  @Input({transform: (value: string | null): string => value ?? ''}) question: string = '';
  @Input({transform: (value: string | null): string => value ?? ''}) question_value: string = '';
  @Input() Answers!: CorrectAnswer[];
  @Input() Reverse!: boolean;
  @Input() answers!: string[];



}
