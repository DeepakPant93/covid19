import { Injectable } from '@angular/core';
import { CoronaProxyService } from '../proxy/corona-proxy.service';
import { Subject } from 'rxjs';
import { CoronaData } from '../model/corona.model';
import { ResponseConverterService } from '../converter/response-converter.service';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  coronaModelSubject = new Subject<CoronaData>();

  constructor(private coronaProxyService: CoronaProxyService, private converter: ResponseConverterService) {
    // Load the Covid 19 summary on startup
    this.loadSummary();
  }

  loadSummary() {
    this.coronaProxyService.fetchSummary().subscribe((response) => this.coronaModelSubject.next(this.converter.convert(response)));
  }

}
