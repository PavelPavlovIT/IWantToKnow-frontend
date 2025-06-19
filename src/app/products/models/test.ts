import { FormControl } from '@angular/forms';

export interface Test {
  testId: string;
  userId: string;
  typeTestId: string;
  created: string;
  started: number;
  countQuestions: number;
  finished: boolean;
}

export type TestForm = {
  [field in keyof Test]: FormControl<Test[field] | null>;
};
