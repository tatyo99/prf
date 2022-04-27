import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { DrinkComponent } from './components/drink/drink.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistComponent } from './components/regist/regist.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'regist', component: RegistComponent},
  {path: 'beer', component: DrinkComponent, canActivate: [AuthGuard]},
  {path: 'whisky', component: DrinkComponent, canActivate: [AuthGuard]},
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
