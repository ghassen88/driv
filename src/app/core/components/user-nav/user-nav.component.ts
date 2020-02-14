import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'drivata-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  @Input() user:any;
  @Input() showUser = false;
  username:string;
  constructor(private authService: AuthService,
              private router: Router,
              private coreService: CoreService) { }

  ngOnInit() {
    this.username = this.coreService.GetUserName();
  }
  Logout(){
    this.authService.Logout().subscribe(res => {
      this.router.navigate(['/auth']);
    })
  }

}
