import {Question} from "./question";
import {CorrectAnswer} from "./correct-answer";

export interface NextQuestion {
  questionViewModel: Question;
  listOfAnswers: CorrectAnswer[];
  started: string;
  expiredTime: boolean;
}
