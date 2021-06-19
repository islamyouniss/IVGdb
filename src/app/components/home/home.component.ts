import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../models/game.model";
import {APIResponse} from "../../models/APIResponse.model";
import {GameService} from "../../services/game.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string = "";
  games: Array<Game> = [];
  isLoading: boolean = false;
  private routeSub = new Subscription();
  private gameSub = new Subscription();

  constructor(private http: GameService, private router: Router, private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.activeRouter.params.subscribe((params: Params) => {
      if(params["game-search"]) {
        this.search("metacrit", params["game-search"]);
      } else {
        this.search("metacrit");
      }
    });
  }

  search(sort: string, search?: string) {
    this.isLoading = true;
    this.gameSub = this.http.list(sort, search).subscribe((gameList: APIResponse<Game>)=> {
      this.isLoading = false;
      this.games = gameList.results;
    });
  }

  showGameDetails(game_id: number) {
    this.router.navigate(['game', game_id]);
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
