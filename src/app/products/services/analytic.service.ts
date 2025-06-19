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
import {Category} from "../models/category";
import {TestResult, TestResultViewModel} from "../models/test-result";
import {TestResultDetails} from "../models/test-result-detail";

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(private http: HttpClient, private logger: LoggerService) {
  }
  public GetAllLastTestByUserIdBySpeaking(): Observable<TestResultViewModel[]> {
    const url = `${environment.apiUrl}/Analytic/GetAllLastTestByUserIdBySpeaking`;

    return this.http
      .get<TestResultViewModel[]>(url,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response || []));
  }


  public GetAllLastTestByUserIdByListen(): Observable<TestResultViewModel[]> {
    const url = `${environment.apiUrl}/Analytic/GetAllLastTestByUserIdByListen`;

    return this.http
      .get<TestResultViewModel[]>(url,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response || []));
  }

  public GetAllLastTestByUserIdByRead(): Observable<TestResultViewModel[]> {
    const url = `${environment.apiUrl}/Analytic/GetAllLastTestByUserIdByRead`;

    return this.http
      .get<TestResultViewModel[]>(url,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response || []));
  }

  public GetResultDetailByTestId(testId: string): Observable<TestResultDetails[]>{
    const url = `${environment.apiUrl}/Analytic/GetResultDetailByTestId?testId=`;

    return this.http
      .get<TestResultDetails[]>(
        url +
        testId,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response || []));
  }
}
