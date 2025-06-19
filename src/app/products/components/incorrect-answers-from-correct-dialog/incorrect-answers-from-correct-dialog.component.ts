import {Component, inject, model} from '@angular/core';
import {CorrectAnswerDialogData} from "../../models/correct-answer-dialog-data";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IncorrectFromCorrectAnswersDialogData} from "../../models/incorrect-from-correct-answers-dialog-data";
import {LoggerService} from "../../../core/services/logger.service";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-incorrect-answers-from-correct-dialog',
  standalone: true,
  imports: [],
  templateUrl: './incorrect-answers-from-correct-dialog.component.html',
  styleUrl: './incorrect-answers-from-correct-dialog.component.scss'
})
export class IncorrectAnswersFromCorrectDialogComponent {
  readonly data = inject<IncorrectFromCorrectAnswersDialogData>(MAT_DIALOG_DATA);
  readonly questionId = model(this.data.Question.questionId);
  readonly title = model(this.data.Title);

  constructor(private logger: LoggerService, private store: Store) {
  }
}
