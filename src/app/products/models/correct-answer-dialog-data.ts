import {FormControl} from "@angular/forms";
import {Question} from "./question";
import {CorrectAnswer} from "./correct-answer";

export interface CorrectAnswerDialogData {
  lang: string;
  Question: Question;
  CorrectAnswerId: string;
  Title: string;
  DialogTitle: string;
  ResultTitle: string;
}
