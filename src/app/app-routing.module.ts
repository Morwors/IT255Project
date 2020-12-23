import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {HomestackComponent} from './homestack/homestack.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'home',
    component: HomestackComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
