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

  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  subscription: Subscription;

  constructor(private covidService: Covid19Service) {
  }

  ngOnInit() {
    this.subscription = this.covidService.covidSummaryModelSubject.subscribe(model => {
      this.totalCases = model.Global.TotalConfirmed;
      this.totalDeaths = model.Global.TotalDeaths;
      this.totalRecovered = model.Global.TotalRecovered;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
