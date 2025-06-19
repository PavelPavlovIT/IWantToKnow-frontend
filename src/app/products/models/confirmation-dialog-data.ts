import {FormControl} from "@angular/forms";
import {Question} from "./question";
import {CorrectAnswer} from "./correct-answer";

export interface ConfirmationDialogData {
  Title: string;
  Id: string;
  Question: string;
  route: string;
  params: string
}
