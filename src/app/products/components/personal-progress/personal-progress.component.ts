import {Component} from '@angular/core';
import {TestResult, TestResultViewModel} from "../../models/test-result";
import {LoggerService} from "../../../core/services/logger.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import * as fromCategories from "../../selectors/categories.selector";
import {AnalyticService} from "../../services/analytic.service";
import {CategoryPageActions} from "../../actions/category-page.actions";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {CdkAccordion, CdkAccordionItem} from "@angular/cdk/accordion";
import {TestResultDetails} from "../../models/test-result-detail";
import {StudyService} from "../../services/study.service";
import {NgxEchartsDirective} from "ngx-echarts";
import {TestsChartsComponent} from "../charts/tests-charts/tests-charts.component";
import {connect, getInstanceByDom} from "echarts";

@Component({
  selector: 'app-personal-progress',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    NgForOf,
    MatCardSubtitle,
    CdkAccordion,
    CdkAccordionItem,
    NgIf,
    MatButton,
    CommonModule, NgxEchartsDirective, TestsChartsComponent
  ],
  templateUrl: './personal-progress.component.html',
  styleUrl: './personal-progress.component.scss'
})
export class PersonalProgressComponent {
  tests: TestResultViewModel[] = [];

  ngOnInit(): void {

  }

  /****
   ****
   ***/

  constructor(
    private logger: LoggerService,
    private analyticService: AnalyticService,
    private router: Router
  ) {

  }


  Goto(proofUrl: string) {
    window.open(proofUrl, '_blank');
  }


}
