import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatChipsModule,
  MatRippleModule
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]

})
export class MaterialModule { }
