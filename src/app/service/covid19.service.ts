import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { CovidSummaryModel } from '../model/covid-summary.model';
import { Covid19ProxyService } from '../proxy/covid19-proxy.service';

@Injectable({
  providedIn: 'root',
})
export class Covid19Service {

  covidSummaryModel: CovidSummaryModel;
  covidSummaryModelSubject = new Subject<CovidSummaryModel>();

  constructor(private covid19ProxyService: Covid19ProxyService) {
    // Load the Covid 19 summary on startup
    this.loadSummary();
  }

  loadSummary() {
    this.covid19ProxyService.fetchSummary().subscribe((response) => this.covidSummaryModelSubject.next(response));
  }

  getSummary() {
    return this.covidSummaryModelSubject;
  }
}
