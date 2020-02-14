import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'drivata-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  addForm = this.fb.group({
    groupName: ['',[Validators.required]]
  });
  @Input() groupsNames: string[];
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    
  }
  onSubmit(){
    const groupName = this.addForm.value.groupName;
    if(!this.addForm.invalid)
    if(this.groupsNames.find(s => s == groupName) == undefined)
      this.activeModal.close(groupName);
  }


}
