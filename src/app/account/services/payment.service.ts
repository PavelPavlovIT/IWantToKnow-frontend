import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "../../core/services/logger.service";
import {catchError, map, Observable, of} from "rxjs";
import {GetTransactionByIdViewModel} from "../models/get-transaction-by-id";
import {PaymentViewModel} from "../models/payment";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private logger: LoggerService) {
  }

  public GetTransactionById(txId: string): Observable<GetTransactionByIdViewModel> {
    const url = `${environment.apiUrl}/Payment/GetTransactionById`;

    const body = {
      txId: txId
    }
    return this.http
      .post<GetTransactionByIdViewModel>(url, body, {withCredentials: true})
      .pipe(
        catchError((error: any): Observable<any> => {
          console.error('Getting txId finished fail!', error);
          return of();
        })
      );
  }

  public GetPaymentsByUserId(): Observable<PaymentViewModel[]>{
    const url = `${environment.apiUrl}/Payment/GetPaymentsByUserId`;

    return this.http
      .get<PaymentViewModel[]>(
        url,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response || []));
  }
}
