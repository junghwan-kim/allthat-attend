import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './lecLogin/login/login.module#LoginPageModule' },
  { path: 'lec-list', loadChildren: './lecPage/lec-list/lec-list.module#LecListPageModule' },
  { path: 'lec-detail/:s/:r/:d', loadChildren: './lecPage/lec-detail/lec-detail.module#LecDetailPageModule',canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
