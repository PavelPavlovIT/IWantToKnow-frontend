import {FormControl} from "@angular/forms";

export interface TestResult {
  testResultId: string;
  "dateStarted": string;
  "timeStarted": string;
  testId: string;
  categoryId: string;
  categoryName: string;
  correctAnswersCount: number;
  testQuestionCount: number;
}

export interface  TestResultViewModel {
  categoryId: string;
  categoryName: string;
  results: TestResult[];
}
export type TestResultForm = {
  [field in keyof TestResult]: FormControl<TestResult[field] | null>;
};
