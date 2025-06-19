import {FormControl} from "@angular/forms";
import {Question} from "./question";
import {CorrectAnswer} from "./correct-answer";

export interface IncorrectFromCorrectAnswersDialogData {
  Question: Question;
  Title: string;
  DialogTitle: string;
  ResultTitle: CorrectAnswer[];
}
