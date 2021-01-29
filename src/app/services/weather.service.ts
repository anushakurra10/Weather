import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { cities } from '../models/weather.model';

@Injectable({ providedIn: "root" })
export class WeatherService {

  private cities$ = new BehaviorSubject<cities>(null);
  private getCities$ = this.cities$.asObservable();
  constructor(private httpClient: HttpClient) {

  }

// <!-- * * * * * * * caching API call* * * * * * * * -->
  public getCities():Observable<cities> {
    const city_ids="{,2643743,2988507,2759794,3128760,3173435,8133832,}";
    if(this.cities$.value){
      return this.getCities$;
    }
    return this.httpClient
        .get<any>(`http://api.openweathermap.org/data/2.5/group?id=${city_ids}`)
        .pipe(map((data:cities) =>{
          this.cities$.next(data)
          return data;
        }),
        catchError(error =>{
          return throwError(error)
        }));
  }

  // <!-- * * * * * * * filter objects with time stamp* * * * * * * * -->
  getForeCast(cityId:string):Observable<cities> {
   return this.httpClient
      .get<any>(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}`)
      .pipe(map(res =>{
        res.list = res.list.filter(element =>{ 
       return element.dt_txt.includes("09:00:00");
      });
      return res;
      }),
      catchError(error =>{
        return throwError(error)
      }))
     
  }
  
}
