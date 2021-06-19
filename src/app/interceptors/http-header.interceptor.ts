import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError as observableThrowError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment as env} from "../../environments/environment";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        "x-rapidapi-key": env.rapidAPI.key,
        "x-rapidapi-host": env.rapidAPI.host
      },
      setParams: {
        key: "e48b8392f0dc4da099660d774edf7957"
      }
    });

    return next.handle(req);
  }
}
