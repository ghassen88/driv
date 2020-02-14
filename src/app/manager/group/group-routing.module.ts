import { Routes, RouterModule } from "@angular/router";
import { GroupContainerComponent } from './containers/group-container/group-container.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: GroupContainerComponent    
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule{}