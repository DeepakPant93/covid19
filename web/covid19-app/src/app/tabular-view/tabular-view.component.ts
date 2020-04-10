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
    {
      title: 'Country',
      name: 'Country'
    },
    {
      title: 'Total Cases',
      name: 'TotalConfirmed',
      sort: false
    },
    { title: 'New Cases', className: 'text-warning', name: 'NewConfirmed' },
    {
      title: 'Total Deaths',
      className: ['office-header', 'text-success'],
      name: 'TotalDeaths',
      sort: 'asc',
    },
    { title: 'New Deaths', name: 'NewDeaths' },
    {
      title: 'Total Recovered.',
      name: 'TotalRecovered',
      sort: ''
    },
    { title: 'New Recovered', name: 'NewRecovered' },
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
    this.subscription =  this.covid19Service.covidSummaryModelSubject.subscribe((model) => { this.data = model.Countries;
                                                                        this.length = this.data.length;
                                                                        this.onChangeTable(this.config); });
  }

  public ngOnDestroy(): void {
    this.subscription .unsubscribe();
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? start + page.itemsPerPage : data.length;
    // return data.slice(start, end);
    return data;
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (true) {
      return data;
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
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
    // this.columns.forEach((column: any) => {
    //   if (column.filtering) {
    //     filteredData = filteredData.filter((item: any) => {
    //       return item[column.Country].match(column.filtering.filterString);
    //     });
    //   }
    // });
    if (true) {
      return filteredData;
    }

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(
          this.config.filtering.filterString
        )
      );
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (
          item[column.name].toString().match(this.config.filtering.filterString)
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

  public onChangeTable(
    config: any,
    page: any = { page: this.page, itemsPerPage: this.itemsPerPage }
  ): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows =
      page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}
