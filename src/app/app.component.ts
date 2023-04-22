import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './user/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(private title: Title, private authService: AuthService) { }

  loggedIn() {
    return this.authService.isLoggedIn();
  }
  ngOnInit(): void {
    this.title.setTitle('Login');
  }
}
