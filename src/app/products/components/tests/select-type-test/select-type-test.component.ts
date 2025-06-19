import {Component, Input} from '@angular/core';
import {TypeTest} from "../../../models/type-test";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {Guid} from "guid-typescript";
import {ActivatedRoute, Router} from "@angular/router";
import {LoggerService} from "../../../../core/services/logger.service";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-select-type-test',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatCardHeader
  ],
  templateUrl: './select-type-test.component.html',
  styleUrl: './select-type-test.component.scss'
})
export class SelectTypeTestComponent {
  @Input() typeOfTests!: TypeTest[];
  @Input() testId!: string;
  typeOfTestId: string = "";
  private categoryId: string = "";

  constructor(private logger: LoggerService, private store: Store, private route: ActivatedRoute, private router: Router,) {
    route.params.subscribe((params) => {
      this.categoryId = params['id'] === 'undefined' ? '' : params['id'];
    });

  }

  OnStart(testId: string, typeOfTestId: string) {

    this.router.navigate([`products/item-test/${testId}`]);
  }
}
