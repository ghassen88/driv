import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/loginModel';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'drivata-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { 
    this.authService.CheckRole();
  }

  ngOnInit() {
  }
  Login(value: LoginModel){
    this.authService.Login(value).subscribe(res => {});
  }
}
