import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, map, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';
import {Question} from '../models/question';
import {logger} from '../../reducers';
import {LoggerService} from '../../core/services/logger.service';
import {CorrectAnswer} from "../models/correct-answer";
import {ResponseQuery} from "../../core/models/response.query";

@Injectable({
  providedIn: 'root',
})
export class CorrectAnswerService {
  constructor(private http: HttpClient, private logger: LoggerService) {
  }

  loadCorrectAnswers(questionId: string): Observable<CorrectAnswer[]> {
    return this.http
      .get<ResponseQuery<CorrectAnswer>>(
        `${environment.apiUrl}/CorrectAnswer/GetCorrectAnswersByQuestionId?questionId=` +
        questionId,
        {
          withCredentials: true,
        }
      )
      .pipe(map((responseQuery) => responseQuery.items || []));
  }

  loadCorrectAnswersByCategoryId(categoryId: string): Observable<CorrectAnswer[]> {
    return this.http
      .get<ResponseQuery<CorrectAnswer>>(
        `${environment.apiUrl}/CorrectAnswer/GetCorrectAnswersByCategoryId?categoryId=` +
        categoryId,
        {
          withCredentials: true,
        }
      )
      .pipe(map((responseQuery) => responseQuery.items || []));
  }

  addCorrectAnswer(correctAnswer: CorrectAnswer): Observable<any> {
    const url = `${environment.apiUrl}/CorrectAnswer/AddCorrectAnswer`;
    this.logger.Success("Add ")
    return this.http
      .post<CorrectAnswer>(url, correctAnswer, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('AddQuestion didn`t execute!', error);
          return of();
        })
      );
  }

  removeCorrectAnswer(correctAnswer: CorrectAnswer): Observable<any> {
    const url = `${environment.apiUrl}/CorrectAnswer/RemoveCorrectAnswer`;
    return this.http
      .post<CorrectAnswer>(url, correctAnswer, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('RemoveQuestion didn`t execute!', error);
          return of();
        })
      );
  }

  updateCorrectAnswer(correctAnswer: CorrectAnswer): Observable<any> {
    const url = `${environment.apiUrl}/CorrectAnswer/UpdateCorrectAnswer`;
    return this.http
      .post<CorrectAnswer>(url, correctAnswer, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('UpdateCorrectAnswer didn`t execute!', error);
          return of();
        })
      );
  }

}
