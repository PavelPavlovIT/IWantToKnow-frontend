import { FormControl } from '@angular/forms';

export interface Category {
  categoryId: string;
  parentId: string;
  nameEn: string;
  descriptionEn: string;
  nameEs: string;
  descriptionEs: string;
  nameRu: string;
  descriptionRu: string;
  orderBy: number;
  countQuestions: number;
  hidden: boolean;
  reverse: boolean;
  testResultListen: string;
  testResultRead: string;
  testResultSpeaking: string;
}

export type CategoryForm = {
  [field in keyof Category]: FormControl<Category[field] | null>;
};
