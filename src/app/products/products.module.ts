import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ProductsRoutingModule} from "./products-routing.module";
import {MaterialModule} from "../material";
import {DetailCategoryComponent} from "./components/category/detail-category/detail-category.component";
import {
  SelectedCategoryPageComponent
} from "./components/category/selected-category-page/selected-category-page.component";
import {QuestionComponent} from "./components/question/question/question.component";
import {ListQuestionComponent} from "./components/question/list-question/list-question.component";
import {PersonalProgressComponent} from "./components/personal-progress/personal-progress.component";
import {NgxEchartsModule} from "ngx-echarts";

import * as echarts from 'echarts';
import {ReactiveFormsModule} from "@angular/forms";

export const COMPONENTS = [
  // ListCategoryComponent,
  QuestionComponent,
];

export const CONTAINERS = [
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductsRoutingModule,
    // StoreModule.forFeature(fromProducts.rootFeatureKey, fromProducts.reducers),
    // EffectsModule.forFeature(CategoryEffects, QuestionsEffects),
    // EffectsModule.forFeature(CorrectAnswersEffects),
    // ListCategoryComponent,
    DetailCategoryComponent,
    SelectedCategoryPageComponent,
    ListQuestionComponent,
    PersonalProgressComponent,
    NgxEchartsModule.forRoot({
      echarts,
    }),
],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ProductsModule {}
