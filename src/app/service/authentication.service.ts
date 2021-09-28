import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: User[] = [];
  req_user: any;

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  authenticate(username: string, password: string) {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.req_user = this.users.find(user => user.name === username)
    console.log(this.req_user)
    if (password === this.req_user.password) {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }
  handleSuccessfulResponse(response: User[]) {
    this.users = response;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  isAdmin(){
    if(this.req_user.type === "admin"){
      return true;
    }
    else
    return false;
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}