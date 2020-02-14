import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Manager } from 'src/app/core/models/manager';

@Component({
  selector: 'drivata-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent implements OnInit {
  @Output() FormValue = new EventEmitter<any>();
  managerForm = this.fb.group({
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    userName: ['',[Validators.required]],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]],
    teamName:['',[Validators.required]],
    address: this.fb.group({
      address: ['',[Validators.required]],
      city: ['',[Validators.required]],
      zip: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required]]
    }),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(){
    let value = this.managerForm.value;
    let manager: Manager = {
      firstName: value.firstName,
      address: value.address.address,
      city: value.address.city,
      confirmPassword: value.confirmPassword,
      lastName: value.lastName,
      password: value.password,
      phoneNumber: value.address.phoneNumber,
      zip: value.address.zip,
      teamName: value.teamName,
      userName: value.userName
    }
    this.FormValue.emit(manager)
  }

}
