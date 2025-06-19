import { Component, Input } from '@angular/core';
import { LoggerService } from "../../../core/services/logger.service";
import { AnalyticService } from "../../services/analytic.service";
import { TestResult, TestResultViewModel } from "../../models/test-result";
import { TestResultDetails } from "../../models/test-result-detail";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { NgForOf, NgIf } from "@angular/common";
import { CdkAccordion, CdkAccordionItem } from "@angular/cdk/accordion";

@Component({
  selector: 'app-personal-progress-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf,
    CdkAccordion,
    CdkAccordionItem
  ],
  templateUrl: './personal-progress-details.component.html',
  styleUrl: './personal-progress-details.component.scss'
})
export class PersonalProgressDetailsComponent {
  testId: string = '';
  tests: TestResultViewModel[] = [];
  @Input() expanded!: boolean;
  @Input() test!: TestResult;
  @Input() testDetails!: TestResultDetails[];

  /****
   ****
   ***/

  constructor(
    private logger: LoggerService,
    private analyticService: AnalyticService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.testId = params['id'] === 'undefined' ? '' : params['id'];
    });
  }
  ngOnInit(): void {
    this.analyticService.GetResultDetailByTestId(this.testId).subscribe(
      (response) => {
        this.testDetails = response;

      }
    );
  }

  accordionClick(expanded: boolean, test: TestResult) {
    if (expanded) {
      this.analyticService.GetResultDetailByTestId(test.testId).subscribe(
        (response) => {
          this.testDetails = response;
        }
      );
    } else {
      this.logger.Error("false")
    }
  }

  CreateTest(testId: string) {
    this.router.navigate(['/products/run-test-by-category',
      'WorkOnMistakes',
      'WorkOnMistakes',
      '2cf853d6-c33a-402f-9e18-5a4e904e5fad',
      testId])
  }
  getPercent(test: TestResult) {
    const percent = Math.floor((test.correctAnswersCount * 100) / test.testQuestionCount);
    return percent;
  }
}
