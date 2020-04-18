import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CoronaModel } from '../model/corona.model';
import { CoronaService } from '../service/corona.service';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let ELEMENT_DATA = new Array<CoronaModel>();

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isDataLoaded = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = ['countryName', 'infected', 'newInfected', 'death', 'newDeath', 'recovered', 'newRecovered'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.subscription = this.coronaService.coronaModelSubject.subscribe(
      data => {
        if (data) {
          this.isDataLoaded = true;
          ELEMENT_DATA = data.countries;
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
