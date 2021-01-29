import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { cities } from '../models/weather.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit {
  paramId:string;
  forecastdata:cities;
  private forecastDestroy$ = new Subject();

  constructor(private weatherService:WeatherService,private route: ActivatedRoute) {
    this.route.params.subscribe( (params: Params) => {
      this.paramId = params.id
    });
   }

  trackByFn(index) {
    return index;
  }

  ngOnInit() {
    this.weatherService.getForeCast(this.paramId).pipe(takeUntil(this.forecastDestroy$)).subscribe((data:cities) =>{
      this.forecastdata = data;
    })
  }

  ngOnDestroy(){
    this.forecastDestroy$.next();
    this.forecastDestroy$.complete();
  }

}
