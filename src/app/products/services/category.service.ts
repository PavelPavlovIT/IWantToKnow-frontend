import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Category } from '../models/category';
import { environment } from '../../environments/environment';
import { LoggerService } from '../../core/services/logger.service';
import { ResponseQuery } from '../../core/models/response.query';
import { LoadingService } from '../../core/services/loading-service ';
import { SkipLoading } from '../../interceptors/loading.interceptor ';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(
    private loadingService: LoadingService,
    private logger: LoggerService, 
    private http: HttpClient) { }

  getHierarchyOfCategories(categoryId: string): Observable<Category[]> {
    return this.http
      .get<ResponseQuery<Category>>(
        `${environment.apiUrl}/Category/GetHierarchyOfCategories?categoryId=` +
        categoryId,
        {
          context: new HttpContext().set(SkipLoading, true),
          withCredentials: true,
        }
      )
      .pipe(map((responseQuery) => responseQuery.items || []));
  }

  loadCategories(parentId: string): Observable<Category[]> {
    const url = `${environment.apiUrl}/Category/GetCategoryByParentId?parentId=` + parentId;
    return this.http
      .get<ResponseQuery<Category>>(
        url,
        {
          context: new HttpContext().set(SkipLoading, true),
          withCredentials: true,
        }
      )
      .pipe(
        map((responseQuery) => responseQuery.items || [])
      );
  }

  addCategory(category: Category): Observable<any> {
    const url = `${environment.apiUrl}/Category/AddCategory`;
    return this.http
      .post<Category>(url, category, { withCredentials: true })
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('AddCategory didn`t execute!', error);
          return of();
        })
      );
  }

  removeCategory(category: Category): Observable<any> {
    const url = `${environment.apiUrl}/Category/RemoveCategory`;
    return this.http
      .post<Category>(url, category, { withCredentials: true })
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('RemoveCategory didn`t execute!', error);
          return of();
        })
      );
  }

  updateCategory(category: Category): Observable<any> {
    const url = `${environment.apiUrl}/Category/UpdateCategory`;
    return this.http
      .post<Category>(url, category, { withCredentials: true })
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('UpdateCategory didn`t execute!', error);
          return of();
        })
      );
  }
}
