import {createActionGroup, props} from "@ngrx/store";
import {CorrectAnswer} from "../models/correct-answer";


export const SelectedCorrectAnswerPageActions = createActionGroup({
  source: 'Selected Correct Answer Page',
  events: {
    /**
     * Add Book to Collection Action
     */
    'Add  Correct Answer': props<{ correctAnswer: CorrectAnswer }>(),

    /**
     * Remove Book from Collection Action
     */
    'Remove  Correct Answer': props<{ correctAnswer: CorrectAnswer }>(),
  },
});
