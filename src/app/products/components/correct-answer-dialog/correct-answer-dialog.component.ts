import {Component, inject, model, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CorrectAnswerForm} from "../../models/correct-answer";
import {CorrectAnswerDialogData} from "../../models/correct-answer-dialog-data";
import {Guid} from "guid-typescript";
import {Question} from "../../models/question";
import {MatButton} from "@angular/material/button";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-correct-answer-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: './correct-answer-dialog.component.html',
  styleUrl: './correct-answer-dialog.component.scss'
})
export class CorrectAnswerDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CorrectAnswerDialogComponent>);
  readonly data = inject<CorrectAnswerDialogData>(MAT_DIALOG_DATA);
  readonly questionId = model(this.data.Question.questionId);
  readonly title = model(this.data.Title);
  readonly correctAnswerId = model(this.data.CorrectAnswerId)

  Save(title: string) {
    this.data.Title = title;
    return {correctAnswer: this.data}
  }
}
