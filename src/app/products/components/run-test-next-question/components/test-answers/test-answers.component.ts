import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TestAnswersListeningComponent} from "./test-answers-listening/test-answers-listening.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TestAnswersReadingComponent} from "./test-answers-reading/test-answers-reading.component";
import {TestAnswersSpeakingComponent} from "./test-answers-speaking/test-answers-speaking.component";

@Component({
  selector: 'app-test-answers',
  standalone: true,
  imports: [
    TestAnswersListeningComponent,
    NgSwitch,
    TestAnswersReadingComponent,
    TestAnswersSpeakingComponent,
    NgSwitchCase
  ],
  templateUrl: './test-answers.component.html',
  styleUrl: './test-answers.component.scss'
})
export class TestAnswersComponent {
  @Input() typeTestId!: string;
  @Input() question_value!: string | null;
  @Input() todo!: string[];
  @Input() done!: string[];
  @Input() Reverse!: boolean;
  @Output() ResultSpeaking = new EventEmitter<string>();

  getResultSpeaking(speech: string) {
    this.ResultSpeaking.emit(speech);
  }
}
