import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "../../core/services/logger.service";
import {map, Observable, of} from "rxjs";
import {CorrectAnswer} from "../models/correct-answer";
import {StartTest} from "../models/start-test";
import {ResponseQuery} from "../../core/models/response.query";
import {environment} from "../../environments/environment";
import {Guid} from "guid-typescript";
import {catchError} from "rxjs/operators";
import {NextQuestion} from "../models/next-question";
import {NextQuestionRequest} from "../models/next-question-request";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private logger: LoggerService) {
  }

  public StartTest(categoryId: string, categoryName: string, typeTestId: string, countQuestion: number): Observable<StartTest> {
    const testId = Guid.create().toString();
    const url = `${environment.apiUrl}/Test/StartTest`;

    const startTest = {
      testId: testId,
      typeTestId: typeTestId,
      categoryId: categoryId,
      categoryName: categoryName,
      countQuestion: countQuestion
    }

    return this.http
      .post<StartTest>(url, startTest, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('startTest didn`t execute!', error);
          return of();
        })
      );
  }

  public NextQuestion(nextQuestion: {
    testId: string | null | undefined;
    typeStudy: string | null | undefined;
    categoryId: string | null | undefined;
    countQuestions: number | null | undefined;
    numberQuestion: number | null | undefined;
    finished: boolean | null | undefined;
    nextQuestionViewModel: {
      questionViewModel: {
        questionId: string | null | undefined;
        categoryId: string | null | undefined;
        title: string | null | undefined;
        proofUrl: string | null | undefined;
        proofCRC: string | null | undefined;
      },
      listOfAnswers: CorrectAnswer[];
      expiredTime: boolean | undefined;
    },
  }): Observable<NextQuestion>{
    const url = `${environment.apiUrl}/Test/GetNextQuestionsByCategoryId`;

    return this.http
      .post<NextQuestion>(url, nextQuestion, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('startTest didn`t execute!', error);
          return of();
        })
      );
  }
}
