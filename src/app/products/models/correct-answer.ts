import {FormControl} from "@angular/forms";
import {Question} from "./question";

export interface CorrectAnswer {
  correctAnswerId: string;
  questionId: string;
  titleEn: string;
  titleEs: string;
  titleRu: string;
  created: string;
  seconds: number;
  changed: string;
}

export type CorrectAnswerForm = {
  [field in keyof CorrectAnswer]: FormControl<CorrectAnswer[field] | null>;
};
