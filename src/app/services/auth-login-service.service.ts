import { Injectable } from '@angular/core';
import { ToastController, Platform,AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod,Headers} from '@angular/http';


let apiUrl = 'http://lec.koreagroupware.com/rest_api/login_chk_ajax.asp';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginServiceService {

  constructor(
    public toastController: ToastController,
    private http: HttpClient
  ) { }

  login(login_data_json): Promise<any> {

    let url = `?lec_id=${encodeURI(login_data_json.UserId)}&lec_pwd=${login_data_json.UserPwd}`;

    //console.log('authentication.service.ts=login',url);
    //REST-API 호출
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl+url,{}).subscribe(res => {
          resolve(res);
          //console.log(res); 
      }, (err) => {
        reject(err);
        console.log(err)
        });
      });
  }
}
