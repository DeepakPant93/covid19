import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DisplayBoardComponent } from './display-board/display-board.component';
import { ElementComponent } from './display-board/element/element.component';
import { GraphicalViewComponent } from './graphical-view/graphical-view.component';
import { HeaderComponent } from './header/header.component';
import { MapViewComponent } from './map-view/map-view.component';
import { BarChartVerticalComponent } from './chats/bar-chart-vertical/bar-chart-vertical.component';
import { DropdownDirective } from './directive/dropdown.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayBoardComponent,
    GraphicalViewComponent,
    MapViewComponent,
    ElementComponent,
    BarChartVerticalComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
