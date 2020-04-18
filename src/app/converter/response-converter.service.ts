import { Injectable } from '@angular/core';
import { CoronaSummaryModel, Global, Country } from '../model/corona-service.model';
import { CoronaData, CoronaModel } from '../model/corona.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseConverterService {

  constructor() { }

  convert(coronaSummaryModel: CoronaSummaryModel): CoronaData {
    let coronaData = null;

    if (coronaSummaryModel) {

      // Filtering and sorting countries data
      const countriesSumary = coronaSummaryModel.Countries.filter(country => country.TotalConfirmed > 0)
        .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);

      const total = this.populateCoronaModel(coronaSummaryModel.Global, coronaSummaryModel.Date);
      const countries = this.populateCountries(countriesSumary);

      // Adding total as world in the first position
      // countries.splice(0, 0, total);

      coronaData = new CoronaData(total, countries);
    }
    return coronaData;
  }

  private populateCoronaModel(total: Global, date: string): CoronaModel {
    return new CoronaModel(
      'World',
      total.TotalConfirmed,
      total.TotalDeaths,
      total.TotalRecovered,
      total.NewConfirmed,
      total.NewDeaths,
      total.NewRecovered,
      date);
  }

  private populateCountries(countries: Country[]): CoronaModel[] {
    return countries.map(country => this.populateCountry(country));
  }

  private populateCountry(country: Country): CoronaModel {
    return new CoronaModel(
      country.Country,
      country.TotalConfirmed,
      country.TotalDeaths,
      country.TotalRecovered,
      country.NewConfirmed,
      country.NewDeaths,
      country.NewRecovered,
      country.Date);
  }
}

