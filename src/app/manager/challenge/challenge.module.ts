import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ChallengesComponent } from './containers/challenges/challenges.component';
import { ChallengeHeaderComponent } from './components/challenge-header/challenge-header.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';


@NgModule({
  declarations: [ChallengesComponent, ChallengeHeaderComponent, ChallengeListComponent],
  imports: [
    CommonModule,
    ChallengeRoutingModule
  ]
})
export class ChallengeModule { }
