import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  Def_type = 'User'
  invalidLogin = false
  success = "You have logged in successfully"
  action = "Dismiss"
  failure = "Please check your username and password again"
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Input()
  user: User = new User;

  @Output()
  userAddedEvent = new EventEmitter();

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private _snackBar: MatSnackBar,
    private httpClientService: HttpClientService,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this._snackBar.open(this.success, this.action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.router.navigate(['/shop'])
      this.invalidLogin = false
    } else
    {
      this.invalidLogin = true
      this._snackBar.open(this.failure, this.action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  addUser() {
    this.user.type = "User"
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        this.userAddedEvent.emit();
        // this.router.navigate(['/shop']);
        location.reload();
      }
    );
  }
  

}