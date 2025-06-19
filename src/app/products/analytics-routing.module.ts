import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category/category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { QuestionComponent } from './components/question/question/question.component';
import { AddQuestionComponent } from './components/question/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/question/update-question/update-question.component';
import {RunTestByCategoryComponent} from "./components/run-test-by-category/run-test-by-category.component";
import {ItemTestComponent} from "./components/tests/item-test/item-test.component";
import {PersonalProgressComponent} from "./components/personal-progress/personal-progress.component";

export const routes: Routes = [
  {
    path: 'analytics/private',
    component: PersonalProgressComponent,
    data: { title: 'Personal progress' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
