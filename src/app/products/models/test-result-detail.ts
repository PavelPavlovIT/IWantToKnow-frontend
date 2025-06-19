import {FormControl} from "@angular/forms";

export interface TestResultDetails {
  testResultDetailId: string;
  testResultId: string;
  questionId: string;
  question: string;
  correctAnswerId: string;
  correctAnswerTitle: string;
  incorrectAnswerId: string;
  incorrectAnswerTitle: string;
  proof: string;
  isCorrectAnswer: boolean;
}

export type TestResultDetailsForm = {
  [field in keyof TestResultDetails]: FormControl<TestResultDetails[field] | null>;
};
