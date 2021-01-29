import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';
import { of } from 'rxjs';

//code coverage 100%
describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let service: WeatherService;

  const MockCities = {
    "cnt": 1, city: { name: "abc", country: "in" }, "list": [{
      id: 1234, name: "london", clouds: {},
      coord: {},
      dt: 1234,
      main: {},
      sys: {},
      visibility: 9000,
      weather: [{ icon: "sd" }],
      wind: {}
    }]
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CityComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [WeatherService]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService)
    spyOn(service, 'getForeCast').and.returnValue(of(MockCities))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get forecast data of particular city', () => {
    expect(component.forecastdata.list.length).toEqual(1);
  });
});
