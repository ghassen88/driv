import { Component, OnInit } from '@angular/core';
import { BordersState } from 'src/app/core/store/reducers/core.reducer';
import { Store } from '@ngrx/store';
import { ShortGroup } from 'src/app/core/models/Group';
import { selectGroups } from 'src/app/core/store/selectors/core.selector';
import { v4 as uuid } from 'uuid';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { InvitedDriver } from '../../../manager/drivers/models/invitedDriver';


@Component({
  selector: 'drivata-invite-driver',
  templateUrl: './invite-driver.component.html',
  styleUrls: ['./invite-driver.component.scss']
})
export class InviteDriverComponent implements OnInit {
  groups: ShortGroup[] = [];
  selectedGroup: uuid;
  inviteForm = this.fb.group({
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    groupId : ['']
  })
  constructor(private BorderStore: Store<BordersState>,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder) {
    this.BorderStore.select(selectGroups).subscribe(res => {
      this.groups = [...res];
      this.selectedGroup = this.groups[0].groupId;
      
    })
   }

  ngOnInit() {
  }
  onSubmit(){
    const value = this.inviteForm.value;
    const invitedDriver: InvitedDriver = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      groupId: value.groupId
    }
    if(!this.inviteForm.invalid)
    this.activeModal.close([invitedDriver]);

  }

}
