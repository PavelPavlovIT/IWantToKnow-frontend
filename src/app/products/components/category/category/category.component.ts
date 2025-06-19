import {Component, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';
import { Store } from '@ngrx/store';
import { CategoryPageActions } from '../../../actions/category-page.actions';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../services/category.service';
import { LoadingService } from '../../../../core/services/loading-service ';
import { ResponsiveService } from '../../../../core/services/responsive-service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  standalone: true
})
export class CategoryComponent implements OnDestroy{
  parentId: string = '';
  categoryName: string = '';
  isMobile: boolean = false;
  categories: Category[] = [];
  isLoading: boolean = true

  constructor(
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    ) {
    this.route.params.subscribe((params) => {
      this.parentId = params['id'] === 'undefined' ? '' : params['id'];
    });
  }

  ngOnDestroy(): void {

    }

  ngOnInit(): void {
    console.log("this.parentId");
    this.isLoading = true;
    const parentId = this.parentId;
    this.categoryService.loadCategories(this.parentId)
      .subscribe(value => {
        this.categories = value;
        this.isLoading = false;
        console.log("this.categories");
      });
  }
}
