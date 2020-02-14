import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class HttpTokenInterceptor  implements HttpInterceptor{

    constructor(private authenticationService: AuthService,private router:Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('Token');
        if(token){
        req = req.clone({
            setHeaders:{
                'Authorization': `Bearer ${token}`
            }
        });
        }
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError(err => {
                if ([401, 403].indexOf(err.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this.authenticationService.Logout().subscribe(res => this.router.navigate([`auth`]));
                }
    
                const error = err.message || err.statusText;
                return throwError(error);
            }));


    }

}