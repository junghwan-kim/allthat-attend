import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { Router } from '@angular/router';
import { AuthLoginServiceService } from './services/auth-login-service.service';
import { StorageServiceService } from './services/storage-service.service';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthLoginServiceService,
    private storageServiceService: StorageServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storageServiceService.authState.subscribe(state => {
        console.log('app.component.ts','인증상태 : ',state)
        if(state){
          this.router.navigate(['lec-list']);
        } else {
          this.router.navigate(['login']); 
        }
      });

    });
  }
}
