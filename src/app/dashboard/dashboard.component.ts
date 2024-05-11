import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppRoutingModule } from '../app-routing.module'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../state/counter.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private user: UserService, private route: AppRoutingModule,
    private store: Store<{ count: number }>
  ) {
    //creating observale to get latest state of the page number
    this.count$ = store.select('count');
  }

  users: any = [];
  pageID = 0;
  isloading = true;
  // storing the latest page ID
  count$: Observable<number>;
  // Caching the Users Data
  usersMap = new Map<number, []>();

  ngOnInit(): void {
    this.count$.subscribe((data: number) => {
      this.pageID = data;
      console.log(data);
      this.fetchUserList(this.pageID);
    })
  }

  fetchUserList(value: number) {
    this.isloading = true;
    // Checking if the users for the perticular page is available or not
    if (this.usersMap.has(this.pageID)) {
      // Not doing the API call and getting data from the Map
      this.users = this.usersMap.get(this.pageID);
    } else {
      // Getting the users from the API
      this.user.fetchUsers(value).subscribe((data: any) => {
        this.users = data.data;
        this.user.setList(this.users);
        this.usersMap.set(this.pageID, this.users);
      });
    }
    this.isloading = false;
  }

  searchUser(searchId: number) {
    console.log(searchId);
    if (searchId) {
      this.users = this.users.filter((el: any) => el.id === searchId);
    } else {
      this.isloading = true;
      //Getting User from state when search field is empty
      this.user.getList().subscribe((data: any) => {
        this.users = data;
        this.isloading = false;
      })
    }
  }

  nextPage() {
    this.store.dispatch(increment());
  }
  previousPage() {
    if (this.pageID !== 1) {
      this.store.dispatch(decrement());
    }
  }

}
