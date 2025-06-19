import {FormControl} from "@angular/forms";
import {CorrectAnswer} from "./correct-answer";

export interface IncorrectAnswer {
  incorrectAnswerId: string;
  questionId: string;
  title: string;
  created: string;
  changed: string;
}

export type IncorrectAnswerForm = {
  [field in keyof IncorrectAnswer]: FormControl<IncorrectAnswer[field] | null>;
};
