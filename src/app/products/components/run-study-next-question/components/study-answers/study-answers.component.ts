import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {
  StudyQuestionAndClockListeningComponent
} from "../question-and-clock/components/study-question-and-clock-listening/study-question-and-clock-listening.component";
import {
  StudyQuestionAndClockReadingComponent
} from "../question-and-clock/components/study-question-and-clock-reading/study-question-and-clock-reading.component";
import {
  StudyQuestionAndClockSpeakingDifficultLevelComponent
} from "../question-and-clock/components/study-question-and-clock-speaking-difficult-level/study-question-and-clock-speaking-difficult-level.component";
import {
  StudyQuestionAndClockSpeakingEasyLevelComponent
} from "../question-and-clock/components/study-question-and-clock-speaking-easy-level/study-question-and-clock-speaking-easy-level.component";
import {
  StudyQuestionAndClockSpeakingMediumLevelComponent
} from "../question-and-clock/components/study-question-and-clock-speaking-medium-level/study-question-and-clock-speaking-medium-level.component";
import {StudyAnswersListeningComponent} from "./components/study-answers-listening/study-answers-listening.component";
import {StudyAnswersReadingComponent} from "./components/study-answers-reading/study-answers-reading.component";
import {
  StudyAnswersSpeakingEasyLevelComponent
} from "./components/study-answers-speaking-easy-level/study-answers-speaking-easy-level.component";
import {
  StudyAnswersSpeakingMediumLevelComponent
} from "./components/study-answers-speaking-medium-level/study-answers-speaking-medium-level.component";
import {
  StudyAnswersSpeakingDifficultLevelComponent
} from "./components/study-answers-speaking-difficult-level/study-answers-speaking-difficult-level.component";
import {Subject} from "rxjs";
import {ResponsiveService} from "../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-answers',
  standalone: true,
  imports: [
    NgSwitchCase,
    StudyQuestionAndClockListeningComponent,
    StudyQuestionAndClockReadingComponent,
    StudyQuestionAndClockSpeakingDifficultLevelComponent,
    StudyQuestionAndClockSpeakingEasyLevelComponent,
    StudyQuestionAndClockSpeakingMediumLevelComponent,
    NgSwitch,
    StudyAnswersListeningComponent,
    StudyAnswersReadingComponent,
    StudyAnswersSpeakingEasyLevelComponent,
    StudyAnswersSpeakingMediumLevelComponent,
    StudyAnswersSpeakingDifficultLevelComponent
  ],
  templateUrl: './study-answers.component.html',
  styleUrl: './study-answers.component.scss'
})
export class StudyAnswersComponent implements OnInit {
  ngOnInit(): void {
    this.responsiveService.resetResultsStudy();
  }
  @Input() isSuccess!: boolean;
  @Input() isError!: boolean;

  @Input() typeTestId!: string;

  @Input() done!: string[];
  @Input() isMobile!: boolean;
  @Input() question_value!: string | null;
  @Input() todo!: string[];
  @Input() Reverse!: boolean;
  @Output() Result = new EventEmitter<boolean>();

  constructor(private responsiveService: ResponsiveService) {
  }
  getResult($event: boolean) {
    this.Result.emit($event);
  }
}
