import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { BordersState } from '../../store/reducers/core.reducer';
import { Store } from '@ngrx/store';
import { selectHeader } from '../../store/selectors/core.selector';

@Component({
  selector: 'drivata-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  headerTitle = '';
  @Output() userNavState = new EventEmitter<boolean>();
  userState = false;
  constructor(private borderStore:Store<BordersState>) { 
    this.borderStore.select(selectHeader).subscribe(res => this.headerTitle = res);

  }

  ngOnInit() {
  }
  openUserNav(){
    this.userState = !this.userState;
    this.userNavState.emit(this.userState);
  }
  onClickedOutside(value){
    this.userState =false;
    this.userNavState.emit(this.userState);
  }

}
