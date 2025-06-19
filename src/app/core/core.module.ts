import { NgModule } from "@angular/core";
import {  CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../material";
import { AppComponent } from "../app.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from "@angular/material/card";
import { HeaderComponent } from "./components/header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { LoadingIndicatorComponent } from "./components/loading-indicator-component/loading-indicator-component.component";
import { FooterComponent } from "./components/footer/footer.component";

export const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  NotFoundPageComponent,
  HeaderComponent,
  LoadingIndicatorComponent,
  FooterComponent,
  // ClockComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatToolbar,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
