import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoronaModel } from '../model/corona.model';
import { CoronaService } from '../service/corona.service';
import { Subscription } from 'rxjs';
import { ColorConstants } from '../model/color';

@Component({
  selector: 'app-display-board',
  templateUrl: './display-board.component.html',
  styleUrls: ['./display-board.component.css']
})


export class DisplayBoardComponent implements OnInit, OnDestroy {

  INFECTED = 'Infected';
  RECOVERED = 'Recovered';
  DEATHS = 'Deaths';

  INFECTED_MSG = 'infected from Coronavirus';
  RECOVERED_MSG = 'recovered from Coronavirus';
  DEATHS_MSG = 'death from Coronavirus';

  INFECTED_COLOR = ColorConstants.INFECTED_COLOR;
  RECOVERED_COLOR = ColorConstants.RECOVERED_COLOR;
  DEATHS_COLOR = ColorConstants.DEATHS_COLOR;

  subscription: Subscription;
  coronaModel: CoronaModel;

  constructor(private coronaService: CoronaService) {
  }

  ngOnInit(): void {
    this.subscription = this.coronaService.coronaModelSubject.subscribe(
      data => {
        if (data) {
          this.coronaModel = data.total;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
