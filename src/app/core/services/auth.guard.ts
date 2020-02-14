import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(private router: Router,private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const role = localStorage.getItem("Role");
        const routeRole = route.data.role;
        if(role && routeRole){
            if(route.data.role != role){
                this.router.navigate(['/auth']);
                return false;
            }
            return true;
        }
         
        else{
            this.router.navigate(['/auth']);
            return false;
        }
        
    }

}