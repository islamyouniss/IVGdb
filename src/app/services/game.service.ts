import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {environment as env} from "../../environments/environment";
import {Game} from "../models/game.model";
import {APIResponse} from "../models/APIResponse.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  list(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set("ordering", ordering);

    if(search) {
      params = new HttpParams().set("search", search);
    }

    return this.http.get<APIResponse<Game>>("https://" + env.rapidAPI.host + "/games", {params: params});
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get("https://" + env.rapidAPI.host + "/games/" + id);
    const gameTrailerRequest = this.http.get("https://" + env.rapidAPI.host + "/games/" + id + "/movies");
    const gameScreenshotRequest = this.http.get("https://" + env.rapidAPI.host + "/games/" + id + "/screenshots");

    return forkJoin({gameInfoRequest, gameTrailerRequest, gameScreenshotRequest}).pipe(map((resp: any)=> {
      return {
        ...resp["gameInfoRequest"],
        screenshots: resp['gameScreenshotRequest']?.results,
        trailers: resp["gameTrailerRequest"]?.results
      }
    }))
  }
}
