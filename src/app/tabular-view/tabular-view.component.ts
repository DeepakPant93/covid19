import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ColorConstants } from '../model/color';
import { CoronaService } from '../service/corona.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent implements OnInit, OnDestroy, AfterViewInit {

  subscription: Subscription;
  isDataLoaded = false;

  INFECTED_COLOR = ColorConstants.INFECTED_COLOR;
  RECOVERED_COLOR = ColorConstants.RECOVERED_COLOR;
  DEATHS_COLOR = ColorConstants.DEATHS_COLOR;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = ['countryName', 'infected', 'newInfected', 'death', 'newDeath', 'recovered', 'newRecovered'];
  dataSource = new MatTableDataSource();

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.subscription = this.coronaService.coronaModelSubject.subscribe(
      data => {
        if (data) {
          this.isDataLoaded = true;
          this.dataSource.data = data.countries;
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  getTotal(attribute: string) {
    return this.dataSource.data.map(t => t[attribute]).reduce((acc, value) => acc + value, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
