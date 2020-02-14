import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Manager } from 'src/app/core/models/manager';
import { LoginInfo } from '../models/loginInfo';
import { LoginModel } from '../models/loginModel';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  

  constructor(private http: HttpClient,private router: Router) { }
    VerifySubscriptionToken(token: string): Observable<any>{
    return this.http.get<any>(environment.apiUrl + `/auth/VerifyToken/${token}`);
  }
  AddManager(manager: Manager): Observable<LoginInfo>{
    return this.http.post<LoginInfo>(environment.apiUrl + `/auth/RegisterManager`,manager)
                    .pipe(map(res => {
                      this.UpdateTokens(res); 
                      return res;
                    }));
  }
  Login(value: LoginModel): Observable<LoginInfo>{
    return this.http.post<any>(environment.apiUrl + `/auth/Login`,value)
                    .pipe(
                      map(res => {
                        this.UpdateTokens(res); 
                        return res;
                      }),
                      map(res => {
                        this.CheckRole();
                        return res;
                      })
                    );
  }
  UpdateTokens(res: LoginInfo): void {
    localStorage.setItem("UserName",res.managerName);
    localStorage.setItem("Role",res.role);
    localStorage.setItem("ManagerId",res.managerId);
    localStorage.setItem("Token",res.token);
    localStorage.setItem("TeamName",res.teamName);
    localStorage.setItem("TeamId",res.teamId);
  }
  Logout(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + `/auth/Logout`)
                    .pipe(map(res => localStorage.clear()));
  }
  CheckRole() {
    const role = localStorage.getItem("Role");
    if(role){
      if(role == "PremiumManager" || role == "RegularManager")
      this.router.navigate(['/manager'])
      if(role == "Admin") 
      this.router.navigate(['/admin'])
    }
  }
}
