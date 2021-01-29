
import {
    HttpTestingController, HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('TestService', () => {

    let httpMock: HttpTestingController;
    let testService: WeatherService;

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
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService]
        });

        testService = TestBed.get(WeatherService);
        httpMock = TestBed.get(HttpTestingController);

    });

    it('getCities() should GET cities in Europe', () => {

        testService.getCities().subscribe((res) => {
            expect(res).toEqual(MockCities);
        });
        const city_ids = "{,2643743,2988507,2759794,3128760,3173435,8133832,}";
        const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/group?id=${city_ids}`);
        expect(req.request.method).toEqual("GET");
        req.flush(MockCities);

        httpMock.verify();
    });

    it('getForeCast() should GET forecast for next 5 days', () => {
        testService.getForeCast("1234").subscribe((res) => {
            expect(res).toEqual(MockCities);
        });
        const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/forecast?id=1234`);
        expect(req.request.method).toEqual("GET");
        req.flush(MockCities);
        httpMock.verify();
    });

});