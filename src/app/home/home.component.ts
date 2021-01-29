import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { cities, list } from '../models/weather.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  cities: list[];
  private cityDestroy$ = new Subject();

  ngOnInit() {
    this.weatherService.getCities().pipe(takeUntil(this.cityDestroy$)).subscribe((data: cities) => {
      this.cities = data.list;
    })
  }
  trackByFn(index) {
    return index;
  }
  ngOnDestroy() {
    this.cityDestroy$.next();
    this.cityDestroy$.complete();
  }

}
