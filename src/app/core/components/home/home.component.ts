import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { LoggerService } from "../../services/logger.service";
import { AccountService } from "../../../account/services";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { MatList, MatListItem } from "@angular/material/list";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { LoadingService } from "../../services/loading-service ";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatList,
    MatListItem,
    MatCardTitle,
    MatCardSubtitle,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
    MatGridList,MatGridTile
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",

})
export class HomeComponent implements OnInit {
  id: string = "undefined";
  name: string = "undefined";
  givenName: string = "undefined";

  constructor(
    private logger: LoggerService,
    // private store: Store,
    private accountService: AccountService
  ) {

  }

  ngOnInit(): void {

  }
}
