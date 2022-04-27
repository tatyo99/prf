import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistService {

  constructor(private http: HttpClient) { }

  regist(username: string, password: string, email: string, address: string, mobile: string) {
    return this.http.post(environment.serverUrl + 'regist',
    {username: username,
      password: password,
      email: email,
      address: address,
      mobile: mobile},
    {withCredentials: true, responseType: 'text'});
  }
}
