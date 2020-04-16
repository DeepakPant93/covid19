import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CovidSummaryModel } from '../model/covid-summary.model';

@Injectable({
  providedIn: 'root'
})
export class Covid19ProxyService {

  constructor(private http: HttpClient) { }

  fetchSummary() {
    return this.http.get<CovidSummaryModel>(environment.covid19SummaryUri);
  }
}
