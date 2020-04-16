import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { Covid19Service } from '../service/covid19.service';
import { Country } from './../model/covid-summary.model';
import { ChartModel } from './../model/chart.model';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.css']
})
export class GraphicalViewComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  countries: Country[];
  countryNames: string[];
  chartDataHolder: ChartModel[];
  selectedCountryName: string;


  constructor(private covidService: Covid19Service) { }

  ngOnInit() {
    this.subscription = this.covidService.covidSummaryModelSubject.subscribe(model => {
      this.countries = model.Countries.filter(country => country.TotalConfirmed > 0).sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      this.countryNames = this.countries.map(country => country.Country);
      this.onSelectCountry(this.countryNames[0]);
    });
  }

  onSelectCountry(countryName: string) {
    if ('' !== countryName && this.countries) {
      this.selectedCountryName = countryName;
      this.chartDataHolder = this.convertToChartDataHolder(this.countries.find(country => countryName === country.Country));
    }
  }

  private convertToChartDataHolder(country: Country) {
    if (country) {
      const chartDataHolder = new Array<ChartModel>();

      const totalCases = new ChartModel('Infected', country.TotalConfirmed);
      const totalRecovered = new ChartModel('Recovered', country.TotalRecovered);
      const totalDeaths = new ChartModel('Deaths', country.TotalDeaths);

      chartDataHolder.push(totalCases);
      chartDataHolder.push(totalRecovered);
      chartDataHolder.push(totalDeaths);

      return chartDataHolder;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
