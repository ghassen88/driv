import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Manager } from 'src/app/core/models/manager';


@Component({
  selector: 'drivata-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  subscriptionToken:string;
  constructor(private authService: AuthService,
              private route:ActivatedRoute,
              private router: Router) { 
      if(!this.route.snapshot.params.token){        
        this.router.navigate(['login']);
      } else {
      this.authService.VerifySubscriptionToken(this.route.snapshot.params.token).subscribe(res => {
        if(res.email == null){
          this.router.navigate(['expired']);
        }else {
          this.subscriptionToken = this.route.snapshot.params.token;
        }
      });
    }
    }

  ngOnInit() {
  }
  Register(manager:Manager){
    manager.token = this.subscriptionToken;
    this.authService.AddManager(manager).subscribe(res => {
      if(res){
      this.router.navigate(['/manager']);
      }
    });
  }

}
