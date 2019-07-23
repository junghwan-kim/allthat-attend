import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController, AlertController,ToastController  } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthLoginServiceService } from '../../services/auth-login-service.service';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;
  loginData = { UserId:'', UserPwd:'' };


  constructor(
    public navCtrl: NavController,
    private authService: AuthLoginServiceService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private Router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private storegeService: StorageServiceService
  ) { 
    
    this.loginData.UserId='';
    this.loginData.UserPwd='';
  }

  ngOnInit() {
    
  }


  loginUser(){

    if(this.loginData.UserId==''){
      this.buttonClick('아이디를 입력하세요');
      return;
    } else if(this.loginData.UserPwd==''){
      this.buttonClick('비밀번호를 입력하세요');
      return;   
    } else {

      this.authService.login(this.loginData).then(data => {
        //this.LoginResultData =data;
        if(data.result=="fail"){
          if(data.LoginFlag == 0){
            this.buttonClick('퇴사 또는 아이디가 존재하지 않습니다.');    
          }else if(data.LoginFlag == 2){
            this.buttonClick('입력하신 비밀번호가 등록된 비밀번호하고 일치 하지 않습니다. 다시 확인해주세요.');  
          }          
          return;
        }else{
          this.storegeService.Login_UserInfo_SET(data);            
        }
        
      }).catch(err => {
        console.log(err);
      });

      
    }
  }

  async buttonClick(msg: string){
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: '확인'
        }
      ]
    });
    await alert.present();
  }

  

}
