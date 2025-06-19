import { FormControl } from '@angular/forms';

export interface TypeTest {
  typeTestId: string;
  name: string;
}

export type TypeTestForm = {
  [field in keyof TypeTest]: FormControl<TypeTest[field] | null>;
};
