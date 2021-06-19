import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../models/game.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0
  gameId: string = "";
  game: Game;
  routeSub = new Subscription();
  gameSub = new Subscription();
  isLoading: boolean = false;

  constructor(private activeRouter: ActivatedRoute, private gameService: GameService) {  }

  ngOnInit(): void {
    this.routeSub = this.activeRouter.params.subscribe((params: Params) => {
      this.gameId = params["id"];
      this.gameDetails(this.gameId);
    });
  }

  gaugeColor(value: number): string {
    if (value > 75) {
      return "#5EE432";
    } else if (value > 50) {
      return "#FFFA50";
    } else if (value > 30) {
      return "#F7aa38";
    } else {
      return "#EF4655";
    }
  }

  gameDetails(id: string) {
    this.isLoading = true;
    this.gameSub = this.gameService.getGameDetails(id).subscribe((gameResponse: Game) => {
      this.game = gameResponse;
    }, (err)=> {

    }, () => {
      this.isLoading = false;
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);

    })
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}


