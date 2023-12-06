import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SingupComponent} from './pages/singup/singup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {authGuards} from './guards/auth-guards';

const routes: Routes = [
  {path: '', component:HomeComponent,canActivate:[authGuards()]},
  {path: 'login', component:LoginComponent},
  {path: 'singup', component:SingupComponent},
  {path: 'profile', component:ProfileComponent,canActivate:[authGuards()]},
  {path: '**', component:HomeComponent,redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
