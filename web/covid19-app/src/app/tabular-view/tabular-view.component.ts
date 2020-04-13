import { Subscription, timer } from 'rxjs';
import { Covid19Service } from './../service/covid19.service';
import { Country } from './../model/covid-summary.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css'],
})
export class TabularViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Country', name: 'Country', class: ['font-weight-bold'] },
    { title: 'Total Cases', name: 'TotalConfirmed', sort: 'desc' },
    { title: 'New Cases', name: 'NewConfirmed' },
    { title: 'Total Deaths', name: 'TotalDeaths' },
    { title: 'New Deaths', name: 'NewDeaths' },
    { title: 'Total Recovered.', name: 'TotalRecovered' },
    { title: 'New Recovered', name: 'NewRecovered' }
  ];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered'],
  };

  private data: Array<Country>;

  public constructor(private covid19Service: Covid19Service) {
    this.length = 0;
  }

  public ngOnInit(): void {
    this.subscription = this.covid19Service.covidSummaryModelSubject.subscribe((model) => {
      this.data = model.Countries.filter(country => country.TotalConfirmed > 0).sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      this.length = this.data.length;
      this.onChangeTable(this.config);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    columns.forEach(column => {
      if (column.sort !== '' && column.sort !== false) {
        columnName = column.name;
        sort = column.sort;
      }
    });

    if (!columnName) {
      return data;
    }
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (
          item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())
        ) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    if (this.data) {
      const filteredData = this.changeFilter(this.data, this.config);
      const sortedData = this.changeSort(filteredData, this.config);
      this.rows = sortedData;
      this.length = sortedData.length;
    }
  }

  public onCellClick(data: Country): void {
    // This method capture the data for a country
  }
}
