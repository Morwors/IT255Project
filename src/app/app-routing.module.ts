import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {HomestackComponent} from './homestack/homestack.component';
import {CollectionComponent} from './collection/collection.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {OwnerComponent} from './owner/owner.component';
import {VenueSearchComponent} from './venue-search/venue-search.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectAuthorizedTo = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectAuthorizedTo},
  },
  {
    path: 'home',
    component: HomestackComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
    children: [
      {path: '', component: CollectionComponent},
      {path: 'venue/:id', component: HomeComponent},
      {path: 'owner', component: OwnerComponent},
      {path: 'search', component: VenueSearchComponent}
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
