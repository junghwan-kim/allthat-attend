import { Injectable } from '@angular/core';
import { AuthLoginServiceService } from './auth-login-service.service';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public authenticationService: AuthLoginServiceService,
    public storageServiceService: StorageServiceService
  ) { }
  canActivate(): boolean {
    //console.log('auth-guard.ts=canActivate');
    return this.storageServiceService.isAuthenticated();
  }
}
