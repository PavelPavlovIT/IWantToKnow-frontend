import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Question} from '../models/question';
import {CorrectAnswer} from "../models/correct-answer";
import {IncorrectAnswer} from "../models/incorrect-answer";

export const QuestionPageActions = createActionGroup({
  source: 'Question Page',
  events: {
    // 'Load Category': emptyProps(),
    'Load Question By Category': props<{ categoryId: string }>(),
    'Add Question': props<{ question: Question }>(),

    'Remove Question': props<{ question: Question }>(),

    'Update Question': props<{ question: Question }>(),

    'Select Question': props<{ id: string }>(),
  },
});
