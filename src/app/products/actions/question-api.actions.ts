import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Question } from "../models/question";
import {CorrectAnswer} from "../models/correct-answer";

export const QuestionApiActions = createActionGroup({
    source: 'Questions/API',
    events: {
      'Load Success': props<{ questions: Question[] }>(),
      'Load Failure': props<{ errorMsg: string }>(),

      'Load Correct Answers Success': props<{ correctAnswers: CorrectAnswer[] }>(),
      'Load Correct Answers Failure': props<{ errorMsg: string }>(),

      'Add Question Success': emptyProps(),
      'Add Question Failure': props<{ errorMsg: string }>(),

      'Remove Question Success': emptyProps(),
      'Remove Question Failure': props<{ errorMsg: string }>(),

      'Update Question Success': emptyProps(),
      'Update Question Failure': props<{ errorMsg: string }>(),

      'Add Correct Answer Success': emptyProps(),
      'Add Correct Answer Failure': props<{ errorMsg: string }>(),

      'Remove Correct Answer Success': emptyProps(),
      'Remove Correct Answer Failure': props<{ errorMsg: string }>(),

      'Update Correct Answer Success': emptyProps(),
      'Update Correct Answer Failure': props<{ errorMsg: string }>(),
      },
  });
