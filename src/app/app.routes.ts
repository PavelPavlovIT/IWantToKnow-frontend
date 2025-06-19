import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/components/home/home.component";
import { NotFoundPageComponent } from "./core/components/not-found-page/not-found-page.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { title: "Home" },
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule)
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then((m) => m.ProductsModule)
  },
  { 
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' },
  {
    path: "**",
    component: NotFoundPageComponent,
    data: { title: "Not found" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
