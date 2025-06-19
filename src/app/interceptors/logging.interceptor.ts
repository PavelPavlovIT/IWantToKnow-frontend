import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    return handler.handle(req);
  }
}
