import {NextQuestion} from "./next-question";

export interface StartTest {
  testId: string;
  expired: boolean;
  typeTestId: string;
  categoryId: string;
  categoryName: string;
  countQuestion: number;
  created: string;
  nextQuestionViewModel: NextQuestion;
}
