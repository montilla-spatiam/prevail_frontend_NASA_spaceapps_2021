import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from '../services//cookie.service';
import { DataService } from '../services//data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<boolean>();

  regKeyView = true;    // Sets initial registration key login
  regInvalid = false;   // Sets invalid message of registration key

  loginView = false;    // Sets traditional login view
  loginInvalid = false; // Sets invalid login message
  isNewUser = false;    // Changes view to register new user


  constructor(
    private data: DataService,
    private ls : CookieService
  ) { }

  ngOnInit(): void {
    if (this.ls.get('regKey')) {
      this.regKeyView = false;
      this.loginView = !this.regKeyView;
    } else {
      this.regKeyView = true;
      this.loginView != this.regKeyView;
    }

  }

  checkRegKey(regKeyVal: string) {
    this.data.validateKey(regKeyVal)
      .subscribe((resp) => {
        console.log(resp)
        if (resp === 'Valid') {
          this.regInvalid = false;
          this.regKeyView = false;
          this.loginView = !this.regKeyView;
          this.ls.set('regKey', regKeyVal)
        } else {
          this.regInvalid = true;
        }
      })
  }

  login(un: string, pw: string) {
    // Currently there is no validation for users.
    // We are just using a pre-generated token for
    // this user, so we'll pretend that whatever input
    // we receive is correct, and will hard code the
    // auth token in the service for now.
    this.regKeyView = false;
    this.loginView = false;
    this.ls.set('username', 'shawn')
    this.loginSuccess.emit(true);
  }

  pretendToLogIn() {
    this.login('shawn','Password');
  }



}
