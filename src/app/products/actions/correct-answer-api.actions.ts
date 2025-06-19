import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Question } from "../models/question";
import {CorrectAnswer} from "../models/correct-answer";

export const CorrectAnswerApiActions = createActionGroup({
    source: 'CorrectAnswer/API',
    events: {
      'Load Correct Answers Success': props<{ correctAnswers: CorrectAnswer[] }>(),
      'Load Correct Answers Failure': props<{ errorMsg: string }>(),

      'Load Correct Answers By Category Success': props<{ correctAnswers: CorrectAnswer[] }>(),
      'Load Correct Answers  By Category Failure': props<{ errorMsg: string }>(),

      'Add Correct Answer Success': emptyProps(),
      'Add Correct Answer Failure': props<{ errorMsg: string }>(),

      'Remove Correct Answer Success': props<{ correctAnswer: CorrectAnswer }>(),
      'Remove Correct Answer Failure': props<{ errorMsg: string }>(),

      'Update Correct Answer Success': props<{ correctAnswer: CorrectAnswer }>(),
      'Update Correct Answer Failure': props<{ errorMsg: string }>(),
      },
  });
