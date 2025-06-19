import {FormControl} from "@angular/forms";

export interface Question {
  questionId: string;
  categoryId: string;
  // keyS3:string;
  // expiredSignedUrlS3: string;
  signedUrlS3: string;
  titleEn: string;
  titleEs: string;
  titleRu: string;
  proofUrlEn: string;
  proofCRCEn: string;
  proofUrlEs: string;
  proofCRCEs: string;
  proofUrlRu: string;
  proofCRCRu: string;
  created: string;
  changed: string;
  correctAnswerEn: string ;
  correctAnswerEs: string ;
  correctAnswerRu: string ;
}

export type QuestionForm = {
  [field in keyof Question]: FormControl<Question[field] | null>;
};
