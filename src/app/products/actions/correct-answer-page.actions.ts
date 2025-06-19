import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Question} from '../models/question';
import {CorrectAnswer} from "../models/correct-answer";
import {IncorrectAnswer} from "../models/incorrect-answer";

export const CorrectAnswerPageActions = createActionGroup({
  source: 'CorrectAnswer Page',
  events: {
    'Load Correct Answers By Question': props<{ questionId: string }>(),
    'Load Correct Answers By Category': props<{ categoryId: string }>(),
    'Load Incorrect Answers By Question': props<{ questionId: string }>(),

    'Add Correct Answer': props<{ correctAnswer: CorrectAnswer }>(),
    'Add Incorrect Answer': props<{ correctAnswer: IncorrectAnswer }>(),

    'Remove Correct Answer': props<{ correctAnswer: CorrectAnswer }>(),
    'Remove Incorrect Answer': props<{ correctAnswer: IncorrectAnswer }>(),

    'Update Correct Answer': props<{ correctAnswer: CorrectAnswer }>(),
    'Update Incorrect Answer': props<{ correctAnswer: IncorrectAnswer }>(),

    'Select Correct Answer': props<{ id: string }>(),
    'Select Inorrect Answer': props<{ id: string }>(),
  },
});
