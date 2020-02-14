import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Observable } from 'rxjs';
import { GroupDetail } from '../../models/group';
import { BordersState } from 'src/app/core/store/reducers/core.reducer';
import { Store } from '@ngrx/store';
import { AddGroup, UpdateHeader } from 'src/app/core/store/actions/core.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/core/components/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'drivata-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.scss'],

})
export class GroupContainerComponent implements OnInit {

  groups$: Observable<GroupDetail[]>
  newGroup: GroupDetail;
  constructor(
    private groupService: GroupService,
    private borderStore: Store<BordersState>,
    private modal: NgbModal,
    translate: TranslateService,
    private toastr: ToastrService
  ) {
    //   if (translate.getBrowserLang())
    //   translate.use(translate.getBrowserLang());
    // else translate.use('en');
  }

  ngOnInit() {
    this.groupService.GetDetailedGroups();

    this.groups$ = this.groupService.groupObservable;
    this.borderStore.dispatch(new UpdateHeader("Groups"))
  }
  AddGroup(value) {
    this.groupService.AddGroup(value);
  }
  ApplyAction(value) {
    switch (value.action) {
      case 'edit': {
        break;
      }
      case 'state': {
        const modalref = this.modal.open(ConfirmComponent, { windowClass: 'confirm-modal' });
        if (value.group.isActif) {
          modalref.componentInstance.requestedAction = 'Group Deactivation';
          modalref.componentInstance.actionDescription = 'Do you confirm the deactivation of the ' + value.group.name + ' group?';
        }
        else {
          modalref.componentInstance.requestedAction = 'Group Activation';
          modalref.componentInstance.actionDescription = 'Do you confirm the activation of the ' + value.group.name + ' group?';
          modalref.componentInstance.confirmType = 1;
        }
        modalref.result.then(res => {
          this.groupService.UpdateState(value.group.groupId);
          this.toastr.success('group ' + value.group.name + ' status has been updated')

        },reason => {})
        break;
      }
      case 'delete': {

        const modalref = this.modal.open(ConfirmComponent, { windowClass: 'delete-modal' });
        modalref.componentInstance.requestedAction = 'Deleting a group';
        modalref.componentInstance.actionDescription = 'Do you confirm the deletion of the ' + value.group.name + ' group?';
        modalref.result.then(res => {
          this.groupService.DeleteGroup(value.group.groupId);
          this.toastr.success('group ' + value.group.name + ' has been successfuly deleted')

        }, reason => { })
        break;
      }
    }

  }

}
