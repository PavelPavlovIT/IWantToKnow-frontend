import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, map, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';
import {Question} from '../models/question';
import {logger} from '../../reducers';
import {LoggerService} from '../../core/services/logger.service';
import {CorrectAnswer} from "../models/correct-answer";
import {ResponseCommand} from "../models/response-comand";
import {ResponseQuery} from "../../core/models/response.query";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient, private logger: LoggerService) {
  }

  loadQuestions(categoryId: string): Observable<Question[]> {
    return this.http
      .get<ResponseQuery<Question>>(
        `${environment.apiUrl}/Question/GetQuestionsByCategoryId?categoryId=` +
        categoryId,
        {
          withCredentials: true,
        }
      )
      .pipe(map((responseQuery) => responseQuery.items || []));
  }

  addQuestion(question: Question): Observable<any> {
    const url = `${environment.apiUrl}/Question/AddQuestion`;
    this.logger.Success("Add ")
    return this.http
      .post<Question>(url, question, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('AddQuestion didn`t execute!', error);
          return of();
        })
      );
  }

  removeQuestion(question: Question): Observable<any> {
    const url = `${environment.apiUrl}/Question/RemoveQuestion`;
    return this.http
      .post<Question>(url, question, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('RemoveQuestion didn`t execute!', error);
          return of();
        })
      );
  }

  updateQuestion(question: Question): Observable<ResponseCommand> {
    const url = `${environment.apiUrl}/Question/UpdateQuestion`;
    return this.http
      .post<Question>(url, question, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('UpdateQuestion didn`t execute!', error);
          return of();
        })
      );
  }

  loadCorrectAnswers(questionId: string): Observable<CorrectAnswer[]> {
    return this.http
      .get<CorrectAnswer[]>(
        `${environment.apiUrl}/Question/GetCorrectAnswersByQuestionId?questionId=` +
        questionId,
        {
          withCredentials: true,
        }
      )
      .pipe(map((correctAnswers) => correctAnswers || []));
  }


}
