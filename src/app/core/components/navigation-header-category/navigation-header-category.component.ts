import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {Category} from '../../../products/models/category';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, Router, RouterEvent, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {LoggerService} from '../../services/logger.service';
import {AccountService} from "../../../account/services";
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-navigation-header-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    NgFor,
    NgIf,
    RouterModule
  ],
  templateUrl: './navigation-header-category.component.html',
  styleUrl: './navigation-header-category.component.scss',
  
})
export class NavigationHeaderCategoryComponent implements OnInit, OnChanges {
  @Input() categories!: Category[];
  //TODO: need add load default
  lang: string | undefined = 'en';
  loading = true;
  /**
   *
   */
  constructor(
    private logger: LoggerService, 
    private accountService: AccountService) {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.lang = this.accountService.Language;
  }

  getNameByLanguage(category: Category) {
    switch (this.lang) {
      case 'es':
        return category.nameEs;
      case 'ru':
        return category.nameRu;
      default:
        return category.nameEn;
    }
  }

  getDescriptionByLanguage(category: Category) {
    switch (this.lang) {
      case 'es':
        return category.descriptionEs;
      case 'ru':
        return category.descriptionRu;
      default:
        return category.descriptionEn;
    }
  }
}
