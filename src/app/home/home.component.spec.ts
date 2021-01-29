import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

//code coverage 100%
describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: WeatherService;
  let fixture: ComponentFixture<HomeComponent>;

  const MockCities = {
    "cnt": 1, "list": [{
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
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [WeatherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService)
    spyOn(service, 'getCities').and.returnValue(of(MockCities))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getcites() should return the list of cities', () => {
    expect(component.cities.length).toBeGreaterThan(0)
  });
});
