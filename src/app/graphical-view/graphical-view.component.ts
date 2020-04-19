import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartModel } from '../model/chart.model';
import { CoronaModel } from '../model/corona.model';
import { CoronaService } from '../service/corona.service';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.css']
})
export class GraphicalViewComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  countries: CoronaModel[];
  countryNames: string[];
  chartDataHolder: ChartModel[];
  selectedCountryName: string;
  selected: string;

  constructor(private coronaService: CoronaService) { }

  ngOnInit() {
    this.subscription = this.coronaService.coronaModelSubject.subscribe(data => {
      this.countries = data.countries;
      this.countryNames = this.countries.map(country => country.name);
      this.selected = this.countryNames[0];
      this.onSelectCountry(this.selected);
    });
  }

  onSelectCountry(countryName: string) {
    if ('' !== countryName && this.countries) {
      this.selectedCountryName = countryName;
      this.chartDataHolder = this.convertToChartDataHolder(this.countries.find(country => countryName === country.name));
    }
  }

  private convertToChartDataHolder(country: CoronaModel) {
    if (country) {
      const chartData = new Array<ChartModel>();

      chartData.push(this.populateChartModel('Infected', country.infected));
      chartData.push(this.populateChartModel('Recovered', country.recovered));
      chartData.push(this.populateChartModel('Deaths', country.death));

      return chartData;
    }
  }

  private populateChartModel(lebel: string, data: number): ChartModel {
    return new ChartModel(lebel, data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
