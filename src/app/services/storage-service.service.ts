import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform,AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod,Headers} from '@angular/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient
  ) {
    this.platform.ready().then(() =>{
      //console.log('authentication.service.ts=0');
      this.ifLoggedIn()
    });
   }


   Login_UserInfo_SET(resData:any){
    //let json_object = {"name":"John", "age":30, "car":null};
    let json_object = resData.LoginFlag[0];
    this.storage.set('USER_INFO',json_object).then((Response) => {
      this.router.navigate(['lec-list']);
      this.authState.next(true);
    });
     
  }


  logout(){
    //console.log('authentication.service.ts=logout');
    this.storage.remove('USER_INFO').then(() => {
        this.router.navigate(['login']);
        this.authState.next(false);
      });
  }

   ifLoggedIn(){
    //console.log('authentication.service.ts=1');
     this.storage.get('USER_INFO').then((Response) => {
        if(Response){
          //console.log('authentication.service.ts=2',Response);
          this.authState.next(true);
        }
     });
   }


    isAuthenticated(){
      //console.log('authentication.service.ts=isAuthenticated');
      return this.authState.value;
    }


    getStoredData() {
      return this.storage.get('USER_INFO').then((val) => { // <-- Here!
        //console.dir(val);
        return val;
      });
    }




    


}
