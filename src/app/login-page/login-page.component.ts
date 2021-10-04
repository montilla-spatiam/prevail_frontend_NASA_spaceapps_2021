import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from '../services//cookie.service';
import { DataService } from '../services//data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<boolean>();

  regKeyView = true; // Sets initial registration key login
  regInvalid = false; // Sets invalid message of registration key

  loginView = false; // Sets traditional login view
  loginInvalid = false; // Sets invalid login message
  isNewUser = false; // Changes view to register new user

  constructor(private data: DataService, private ls: CookieService) {}

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
    this.data.validateKey(regKeyVal).subscribe((data) => {
      console.log(data);
      if (data === 'Valid') {
        this.regInvalid = false;
        this.regKeyView = false;
        this.loginView = !this.regKeyView;
        this.ls.set('regKey', regKeyVal);
      } else {
        this.regInvalid = true;
      }
    });
  }

  login(un: string, pw: string) {
    this.data.login(un, pw).subscribe(async (data: any) => {
      await this.ls.set('username', un);
      await this.ls.set('token', data['token']);
      await this.data.updateHttpOptions();
      this.regKeyView = false;
      this.loginView = false;
      this.loginSuccess.emit(true);
    });
  }

  pretendToLogIn() {
    this.login('shawn', 'Password');
  }
}
