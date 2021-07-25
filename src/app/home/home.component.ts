import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService, AuthenticationService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
        .subscribe(() => this.loadAllUsers());
  }

  loadAllUsers() {
    this.userService.getAll()
        .subscribe(users => this.users = users);
  }
}
