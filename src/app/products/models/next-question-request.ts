import {Question} from "./question";
import {CorrectAnswer} from "./correct-answer";
import {NextQuestion} from "./next-question";

export interface NextQuestionRequest {
  testId: string | undefined;
  categoryId: string | undefined;
  nextQuestionViewModel: NextQuestion | undefined;
  numberQuestion: number | undefined;
  countQuestions: number | undefined;
  finished: boolean | undefined;
}
