import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../account/services';
import { Category } from '../../../products/models/category';
import { CategoriesService } from '../../../products/services/category.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ResponsiveService } from '../../services/responsive-service';

@Component({
  selector: 'app-header-hierarchy-of-categories',
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
    RouterModule,
    MatMenuModule
  ],
  templateUrl: './header-hierarchy-of-categories.component.html',
  styleUrl: './header-hierarchy-of-categories.component.scss'
})
export class HeaderHierarchyOfCategoriesComponent implements OnInit {
  @Input() categoryId!: string;
  @Input() isMatCard: boolean = true;
  categories: Category[]=[];
  lang: string | undefined = 'en';
  isMobile: boolean = false;

  /**
   *
   */
  constructor(
    private accountService: AccountService,
    private categoriesService: CategoriesService,
    private responsiveService: ResponsiveService,
  ) {
    this.responsiveService.screenWidth$.subscribe(
      value => {
        this.isMobile = value <= 700;
      }
    )
  }
  getTitleCategoriesByLanguage() {
    switch (this.lang) {
      case 'es':
        return 'Categoría';
      case 'ru':
        return 'Категория';
      default:
        return 'Category';
    }
  }
  ngOnInit(): void {
    this.accountService.UserInfo$.subscribe(value => {
      this.lang = value?.language;
    });
    this.categoriesService.getHierarchyOfCategories(this.categoryId)
      .subscribe(response => {
        this.categories = response;
      })

  }

  getNameByLanguage(category: Category) {
    switch (this.accountService.Language) {
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
