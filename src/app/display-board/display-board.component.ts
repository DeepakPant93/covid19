import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoronaModel } from '../model/corona.model';
import { CoronaService } from '../service/corona.service';
import { Subscription } from 'rxjs';

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

  INFECTED_COLOR = '#C7B42C';
  RECOVERED_COLOR = '#5AA454';
  DEATHS_COLOR = 'red';

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
