import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {TestService} from "../../services/test.service";
import {StartTest} from "../../models/start-test";
import {Observable} from "rxjs";
import {RunTestNextQuestionComponent} from "../run-test-next-question/run-test-next-question.component";
import {AsyncPipe} from "@angular/common";
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-run-test-by-category',
  standalone: true,
  imports: [
    RunTestNextQuestionComponent,
  ],
  templateUrl: './run-test-by-category.component.html',
  styleUrl: './run-test-by-category.component.scss'
})
export class RunTestByCategoryComponent {
  categoryId: string = '';
  typeTestId: string = '';
  testId: string = '';
  categoryName: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'] === 'undefined' ? '' : params['id'];
      this.categoryName = params['categoryName'] === 'undefined' ? '' : params['categoryName'];
      this.typeTestId = params['typeTestId'] === 'undefined' ? '' : params['typeTestId'];
      this.testId = params['testId'] === 'undefined' ? '' : params['testId'];1
    });
  }
}
