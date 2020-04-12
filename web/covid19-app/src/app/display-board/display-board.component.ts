import { Component, OnInit, OnDestroy } from '@angular/core';
import { Covid19Service } from '../service/covid19.service';
import { CovidSummaryModel } from '../model/covid-summary.model';
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

  INFECTED_MSG = 'Total number of infected cases of Covid-19';
  RECOVERED_MSG = 'Total number of recovered cases of Covid-19';
  DEATHS_MSG = 'Total number of dead cases of Covid-19';

  INFECTED_COLOR = 'purple';
  RECOVERED_COLOR = 'green';
  DEATHS_COLOR = 'red';

  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  newCases: number;
  newDeaths: number;
  newRecovered: number;
  subscription: Subscription;
  constructor(private covidService: Covid19Service) {
  }

  ngOnInit() {
    this.subscription = this.covidService.covidSummaryModelSubject.subscribe(model => {
      this.totalCases = model.Global.TotalConfirmed;
      this.totalDeaths = model.Global.TotalDeaths;
      this.totalRecovered = model.Global.TotalRecovered;
      this.newCases = model.Global.NewConfirmed;
      this.newDeaths = model.Global.NewDeaths;
      this.newRecovered = model.Global.NewRecovered;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
