import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { GroupDetail } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupsSubject = new BehaviorSubject<GroupDetail[]>([]);
  groupObservable = this.groupsSubject.asObservable();
  constructor(private http: HttpClient) { }
  GetDetailedGroups(){
    this.http.get<GroupDetail[]>(environment.apiUrl + `/groups/GroupsDetails`).subscribe(res => this.groupsSubject.next(res));
  }
  AddGroup(groupName:string) {
    this.http.put<GroupDetail>(environment.apiUrl + `/groups`,{name: groupName}).subscribe(res => {
      const groups = this.groupsSubject.value;
      this.groupsSubject.next([...groups,res])
    })
  }
  DeleteGroup(groupId){
    this.http.delete(environment.apiUrl + `/groups/${groupId}`).subscribe(res => {
      let groups = this.groupsSubject.value;
      groups.splice(groups.findIndex(g => g.groupId == groupId),1);
      this.groupsSubject.next([...groups]);
    })
  }
  UpdateState(groupId){
    this.http.post(environment.apiUrl + `/groups/state/${groupId}`,{}).subscribe(res => {
      let groups = this.groupsSubject.value;
      let groupIndex = groups.findIndex(g => g.groupId == groupId)
      groups[groupIndex].isActif = !groups[groupIndex].isActif;
      this.groupsSubject.next([...groups]);
    })
  }
}
