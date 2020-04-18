import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CoronaSummaryModel } from '../model/corona-service.model';

@Injectable({
  providedIn: 'root'
})
export class CoronaProxyService {

  constructor(private http: HttpClient) { }

  fetchSummary() {
    return this.http.get<CoronaSummaryModel>(environment.coronaSummaryUrl);
  }
}
