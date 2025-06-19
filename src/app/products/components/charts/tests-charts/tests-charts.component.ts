import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgxEchartsDirective, NgxEchartsModule } from "ngx-echarts";
import { connect, EChartsCoreOption, getInstanceByDom } from "echarts";
import { TestResult, TestResultViewModel } from "../../../models/test-result";
import { groupBy, result } from "lodash";
import { LoggerService } from "../../../../core/services/logger.service";
import { AnalyticService } from "../../../services/analytic.service";
import { Router } from "@angular/router";
import { CdkAccordion, CdkAccordionItem } from "@angular/cdk/accordion";
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { PersonalProgressDetailsComponent } from "../../personal-progress-details/personal-progress-details.component";
import { TestResultDetails } from "../../../models/test-result-detail";
import { MatDivider } from "@angular/material/divider";
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import * as fromCategories from '../../../selectors/categories.selector';
import { NavigationHeaderCategoryComponent } from '../../../../core/components/navigation-header-category/navigation-header-category.component';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';
import { Store } from '@ngrx/store';
import { HeaderHierarchyOfCategoriesComponent } from '../../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component';
import { AccountService } from '../../../../account/services';

@Component({
  selector: 'app-tests-charts',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CommonModule,
    NgxEchartsDirective,
    CdkAccordion,
    CdkAccordionItem,
    MatCard,
    MatCardContent,
    PersonalProgressDetailsComponent,
    HeaderHierarchyOfCategoriesComponent,
    MatCardSubtitle,
  ],
  templateUrl: './tests-charts.component.html',
  styleUrl: './tests-charts.component.scss'
})
export class TestsChartsComponent {

  categoryId: string = "";
  options: EChartsCoreOption[] = [];
  tempOptions: EChartsCoreOption = {
    color: ['limegreen'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      top: '5%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Counters',
        type: 'line',
        barWidth: '20%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  testsResultsBySpeaking: TestResultViewModel[] = [];
  testsResultsByListen: TestResultViewModel[] = [];
  testsResultsByRead: TestResultViewModel[] = [];

  chartsSpeaking: Chart[] = [];
  chartsListen: Chart[] = [];
  chartsRead: Chart[] = [];
  testDetails: TestResultDetails[] = [];
  isExpired: boolean | undefined;


  constructor(
    private logger: LoggerService,
    private analyticService: AnalyticService,
    private accountService: AccountService,
    private router: Router
  ) {
    // this.categoriesHierarchy$ = store.select(fromCategories.selectCategoriesHierarchy);
    this.accountService.UserInfo$.subscribe(value => {
      this.isExpired = value?.expired;

      if (!this.isExpired) {
        this.analyticService.GetAllLastTestByUserIdBySpeaking().subscribe(
          (response) => {
            this.testsResultsBySpeaking = response;
            let grouped = this.testsResultsBySpeaking.reduce(
              (result: any, currentValue: any) => {
                const results = currentValue.results as TestResult[];
                let tuple = { categoryId: '', categoryName: '', options: {}, tests: results };

                const keys = results.map((result: TestResult) => result.dateStarted);
                const values = results.map((result: TestResult) => Math.floor((result.correctAnswersCount * 100 / result.testQuestionCount)));
                tuple.categoryName = currentValue['categoryName'];
                tuple.categoryId = currentValue['categoryId'];
                tuple.options = {
                  color: ['limegreen'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    top: '5%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: keys,
                      axisTick: {
                        alignWithLabel: true,
                      },
                    },
                  ],
                  yAxis: [
                    {
                      type: 'value',
                    },
                  ],
                  series: [
                    {
                      name: 'Counters',
                      type: 'line',
                      barWidth: '60%',
                      data: values,
                    },
                  ],
                };
                this.chartsSpeaking.push(tuple);
                (result[currentValue['categoryName']] = result[currentValue['categoryName']] || []).push(currentValue);
                return result;
              }, {});
          }
        );
        this.analyticService.GetAllLastTestByUserIdByListen().subscribe(
          (response) => {
            this.testsResultsByListen = response;
            let grouped = this.testsResultsByListen.reduce(
              (result: any, currentValue: any) => {
                const results = currentValue.results as TestResult[];

                let tuple = { categoryId: '', categoryName: '', options: {}, tests: results };

                const keys = results.map((result: TestResult) => result.dateStarted);
                const values = results.map((result: TestResult) => Math.floor((result.correctAnswersCount * 100 / result.testQuestionCount)));
                tuple.categoryName = currentValue['categoryName'];
                tuple.categoryId = currentValue['categoryId'];
                tuple.options = {
                  color: ['limegreen'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    top: '5%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: keys,
                      axisTick: {
                        alignWithLabel: true,
                      },
                    },
                  ],
                  yAxis: [
                    {
                      type: 'value',
                    },
                  ],
                  series: [
                    {
                      name: 'Counters',
                      type: 'line',
                      barWidth: '60%',
                      data: values,
                    },
                  ],
                };
                console.log("tuple", tuple);
                this.chartsListen.push(tuple);


                (result[currentValue['categoryName']] = result[currentValue['categoryName']] || []).push(currentValue);
                return result;
              }, {});
          }
        );
        this.analyticService.GetAllLastTestByUserIdByRead().subscribe(
          (response) => {
            this.testsResultsByRead = response;
            let grouped = this.testsResultsByRead.reduce(
              (result: any, currentValue: any) => {
                const results = currentValue.results as TestResult[];

                let tuple = { categoryId: '', categoryName: '', options: {}, tests: results };

                const keys = results.map((result: TestResult) => result.dateStarted);
                const values = results.map((result: TestResult) => Math.floor((result.correctAnswersCount * 100 / result.testQuestionCount)));
                tuple.categoryName = currentValue['categoryName'];
                tuple.categoryId = currentValue['categoryId'];
                tuple.options = {
                  color: ['limegreen'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    top: '5%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: keys,
                      axisTick: {
                        alignWithLabel: true,
                      },
                    },
                  ],
                  yAxis: [
                    {
                      type: 'value',
                    },
                  ],
                  series: [
                    {
                      name: 'Counters',
                      type: 'line',
                      barWidth: '200%',
                      data: values,
                    },
                  ],
                };
                this.chartsRead.push(tuple);


                (result[currentValue['categoryName']] = result[currentValue['categoryName']] || []).push(currentValue);
                return result;
              }, {});
          }
        );

      }
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      const chartElement0 = document.getElementById('chart0');
      const chartElement1 = document.getElementById('chart1');
      const chartElement2 = document.getElementById('chart2');
      const chart0 = chartElement0 ? getInstanceByDom(chartElement0) : undefined;
      const chart1 = chartElement1 ? getInstanceByDom(chartElement1) : undefined;
      const chart2 = chartElement2 ? getInstanceByDom(chartElement2) : undefined;
      connect([chart0!,chart1!, chart2!]);
    });
  }

  accordionClick(expanded: boolean, test: Chart) {
    // if (expanded) {
    //   this.analyticService.GetResultDetailByTestId(test.).subscribe(
    //     (response) => {
    //       this.testDetails = response;
    //     }
    //   );
    // } else {
    //   this.logger.Error("false")
    // }
  }
}

export interface Chart {
  categoryId: string;
  categoryName: string
  options: EChartsCoreOption;
  tests: TestResult[];
}
