import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
// <!-- * * * * * * * Inceptor for appid * * * * * * * * -->
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setParams:{
                appid:"3d8b309701a13f65b660fa2c64cdc517"
            }                          
        });
        return next.handle(req);
    }
}