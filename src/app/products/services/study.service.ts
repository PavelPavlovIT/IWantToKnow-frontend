import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {LoggerService} from "../../core/services/logger.service";
import {map, Observable, of} from "rxjs";
import {CorrectAnswer} from "../models/correct-answer";
import {StartTest} from "../models/start-test";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {NextQuestion} from "../models/next-question";
import {SkipLoading} from "../../interceptors/loading.interceptor ";

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: HttpClient, private logger: LoggerService) {
  }

  public StartStudy(categoryId: string, typeTestId: string): Observable<StartTest> {
    const url = `${environment.apiUrl}/Study/StartStudy?categoryId=` + categoryId + '&typeTestId=' + typeTestId;

    return this.http
      .get<StartTest>(url,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response || []));
  }

  public CheckAnswerStudy(
    nextQuestion: {
      testId: string | null | undefined;
      typeTestId: string | null | undefined;
      speakingResult: boolean | undefined;
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
    }
  ): Observable<NextQuestion> {
    const url = `${environment.apiUrl}/Study/CheckAnswerStudy`;
    return this.http
      .post<NextQuestion>(url, nextQuestion,
        {
          withCredentials: true
        })
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('startTest didn`t execute!', error);
          return of();
        })
      );
  }

  public GetNextQuestionsForStudy(
    nextQuestion: {
      testId: string | null | undefined;
      typeTestId: string | null | undefined;
      speakingResult: boolean | undefined;
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
    }
  ): Observable<NextQuestion> {
    const url = `${environment.apiUrl}/Study/GetNextQuestionsForStudy`;

    return this.http
      .post<NextQuestion>(url, nextQuestion,
        {
          withCredentials: true
        })
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('startTest didn`t execute!', error);
          return of();
        })
      );
  }

}
