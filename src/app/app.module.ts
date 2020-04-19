import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { DisplayBoardComponent } from './display-board/display-board.component';
import { DisplayCardComponent } from './display-board/display-card/display-card.component';
import { DisplayChipComponent } from './display-board/display-chip/display-chip.component';
import { FooterComponent } from './footer/footer.component';
import { GraphicalViewComponent } from './graphical-view/graphical-view.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { TabularViewComponent } from './tabular-view/tabular-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayBoardComponent,
    GraphicalViewComponent,
    TabularViewComponent,
    DisplayCardComponent,
    FooterComponent,
    DisplayChipComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxChartsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
