import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './containers/challenges/challenges.component';
const routes: Routes = [
  {
    path: '',
    component: ChallengesComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
