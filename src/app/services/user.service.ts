import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private Http: HttpClient) { }

  private userList = new BehaviorSubject<[]>([]);

  setList(list: any) {
    this.userList.next(list);
  }
  getList() {
    return this.userList.asObservable();
  }

  // API calls
  fetchUsers(pageNumber: number) {
    return this.Http.get(`https://reqres.in/api/users?page=${pageNumber}`);
  }

  fetchUserDetails(id: number) {
    return this.Http.get(`https://reqres.in/api/users/${id}`);
  }


}
