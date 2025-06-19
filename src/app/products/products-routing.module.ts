import {NgModule} from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import {AddCategoryComponent} from './components/category/add-category/add-category.component';
import {UpdateCategoryComponent} from './components/category/update-category/update-category.component';
import {QuestionComponent} from './components/question/question/question.component';
import {AddQuestionComponent} from './components/question/add-question/add-question.component';
import {UpdateQuestionComponent} from './components/question/update-question/update-question.component';
import {RunTestByCategoryComponent} from "./components/run-test-by-category/run-test-by-category.component";
import {PersonalProgressComponent} from "./components/personal-progress/personal-progress.component";
import {
  PersonalProgressDetailsComponent
} from "./components/personal-progress-details/personal-progress-details.component";
import {RunStudyByCategoryComponent} from './components/run-study-by-category/run-study-by-category.component';
import {AuthGuard} from '../account/services/auth-guard';
import {MainListComponent} from "./components/category/main-list/main-list.component";

export const routes: Routes = [
  {
    path: 'analytics',
    component: PersonalProgressComponent,
    canActivate: [AuthGuard],
    data: { title: 'Personal progress' },
  },
  {
    path: 'analytics/:id',
    component: PersonalProgressDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Test results' },
  },
  {
    path: 'categories',
    component: MainListComponent,
    data: { title: 'Category list' },
  },
  {
    path: 'categories/:id',
    component: MainListComponent,
    data: { title: 'Category list' },
  },
  {
    path: 'add-category/:id',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Add category' },
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Add category' },
  },
  {
    path: 'update-category/:id',
    component: UpdateCategoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Update category' },
  },
  {
    path: 'questions/:id',
    component: QuestionComponent,
    data: { title: 'Question list' },
  },
  {
    path: 'add-question/:id',
    component: AddQuestionComponent,
    canActivate: mapToCanActivate([AuthGuard]),
    data: { title: 'Add question' },
  },
  {
    path: 'update-question/:id',
    component: UpdateQuestionComponent,
    canActivate: [AuthGuard],
    data: { title: 'Update category' },
  },
  {
    path: 'run-test-by-category/:id/:categoryName/:typeTestId/:testId',
    component: RunTestByCategoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Run test' },
  },
  {
    path: 'run-study-by-category/:id/:typeTestId',
    component: RunStudyByCategoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Run study' },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ProductsRoutingModule {}
