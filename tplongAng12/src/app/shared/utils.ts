import { Observable, of } from "rxjs";
import {HttpHeaders, HttpParams} from "@angular/common/http";

export class Utils {

  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError<T>(operation: any, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  }

  getHttpParams(page: number, limit: number, rendu: boolean): HttpParams {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    params = params.append('rendu', rendu);
    return params;
  }
}
