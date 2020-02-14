import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../models/loginModel';

@Component({
  selector: 'drivata-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() FormValue = new EventEmitter<LoginModel>();
  loginForm = this.fb.group({
    userName: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(){
    const value = this.loginForm.value;
    const loginInfo: LoginModel = {
      userName: value.userName,
      password: value.password
    }
    this.FormValue.emit(loginInfo);
  }

}
