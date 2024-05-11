import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  constructor(private user: UserService, private activeRoute: ActivatedRoute) { }

  userId: any = 0;
  userDetails: any = [];
  isloading = true;


  ngOnInit(): void {
    this.isloading = true;
    this.userId = this.activeRoute.snapshot.paramMap.get('id');
    this.user.fetchUserDetails(this.userId).subscribe((data: any) => {
      this.userDetails = data.data;
      console.log(this.userDetails);
      this.isloading = false;
    });
  }
}
