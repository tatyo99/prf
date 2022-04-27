import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegistService } from 'src/app/services/regist.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  address: string;
  mobile: string;

  constructor(private registService: RegistService, private loginService: LoginService, private router: Router) {
    this.username = "";
    this.password = "";
    this.email = "";
    this.address = "";
    this.mobile = "";
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
      }, err => {
        console.log(err);
      });
    }
  }

  regist() {
    if(this.username != '' && this.password != '' && this.email != '' && this.address != '' && this.mobile != '') {
      this.registService.regist(this.username, this.password, this.email, this.address, this.mobile).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('user', this.username);
        this.router.navigate(['/beer']);
      }, err => {
        console.log(err);
      })
    }
  }

}
