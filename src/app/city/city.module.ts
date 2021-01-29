import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city.component';
import { CityRoutingModule } from './city-routing.module';


@NgModule({
  declarations: [CityComponent],
  imports: [
    CommonModule,
    CityRoutingModule
  ]
})
export class CityModule { }
