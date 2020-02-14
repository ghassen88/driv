import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { GroupDetail } from '../../models/group';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGroupComponent } from '../add-group/add-group.component';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'drivata-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GroupListComponent implements OnInit,OnChanges {
  
  groupColumns = ['Name', 'Members', 'Creation', 'Supervisors', 'Status'];
  groupAttributes = ['name', 'members', 'createdAt','', 'isActif'];

  sortAscend = false;
  sortedColumn: string;
  rowCounts = [10, 20, 50];
  rowCount = 10;
  page = 1;
  active = false;
  @Output() newGroup = new EventEmitter();
  @Output() groupAction = new EventEmitter();



  @Input() groups:GroupDetail[];
  @Input() group:GroupDetail;
  showedGroups: GroupDetail[] = [];
  filteredGroups : GroupDetail[] = [];



  constructor(private modal: NgbModal) { }
  ngOnChanges() {
    if(this.groups && this.groups.length != 0){
      this.filteredGroups = this.groups;
      this.showedGroups = this.filteredGroups.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount)
    }
    if(this.group){      
      this.groups.push(this.group);
      this.filteredGroups = this.groups;
      this.showedGroups = this.filteredGroups.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);

    }

  }
  ngOnInit() {
  }
  Sort(value:string){
    if (this.sortedColumn != value)
      this.sortAscend = false;
    else
      this.sortAscend = !this.sortAscend;
    this.sortedColumn = value;
    this.groups.sort((d1, d2) => {
      let at1 = d1[Object.keys(d1).find(a1 => a1 == value)];
      let at2 = d2[Object.keys(d2).find(a2 => a2 == value)];
      if (typeof (at1) == 'string') {
        at1 = at1.toLowerCase();
        at2 = at2.toLowerCase();
      }
      if (at1 > at2)
        if (this.sortAscend)
          return -1;
        else return 1;
      else if (at1 < at2)
        if (this.sortAscend)
          return 1;
        else return -1;
      else return 0;
    });
    this.showedGroups = this.groups.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
  }
  Show(){
    this.showedGroups = this.filteredGroups.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
  }
  Filter(value: boolean){
    this.active = value;
    if(this.active)
      this.filteredGroups = this.groups.filter(g => g.isActif == true);      
    else 
      this.filteredGroups = this.groups;
    this.showedGroups = this.filteredGroups.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
  }
  AddGroup(){
    const modalref = this.modal.open(AddGroupComponent, { windowClass: 'add-group-modal' });
    modalref.componentInstance.groupsNames = this.groups.map(g => g.name);
     modalref.result.then((groupName: string) => {
       this.newGroup.emit(groupName);
       }, (reason: any) => { })
  }
  ApplyAction(groupId: uuid,action:string){
    const group = this.groups.find(g => g.groupId == groupId);
    this.groupAction.emit({group,action});
  }

}
