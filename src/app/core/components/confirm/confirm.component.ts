import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'drivata-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() requestedAction:string;
  @Input() actionDescription:string;
  @Input() confirmType = 0;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
