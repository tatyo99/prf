import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  logoPath = 'assets/beer-logo.png';
  profilePath = 'assets/profile-logo.png';
  basketPath = 'assets/basket-logo.png';
  logoutPath = 'assets/logout.png';

  constructor() { }

  ngOnInit(): void {
  }

}
