import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RunStudyNextQuestionComponent} from "../run-study-next-question/run-study-next-question.component";

@Component({
  selector: 'app-run-study-by-category',
  standalone: true,
  imports: [RunStudyNextQuestionComponent],
  templateUrl: './run-study-by-category.component.html',
  styleUrl: './run-study-by-category.component.scss'
})
export class RunStudyByCategoryComponent implements OnDestroy {
  categoryId: string = '';
  typeTestId: string = '';
  reverse: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'] === 'undefined' ? '' : params['id'];
      this.typeTestId = params['typeTestId'] === 'undefined' ? '' : params['typeTestId'];
    });
  }

  ngOnDestroy(): void {
    //this.route.params.unsubscribe();
  }

}
