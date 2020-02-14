import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupContainerComponent } from './containers/group-container/group-container.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupListComponent } from './components/group-list/group-list.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdownModule,  NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ConfirmComponent } from 'src/app/core/components/confirm/confirm.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';



@NgModule({
  declarations: [GroupContainerComponent,GroupListComponent,AddGroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    CoreModule,
  
  ],
  entryComponents:[AddGroupComponent,ConfirmComponent]
})
export class GroupModule { }
