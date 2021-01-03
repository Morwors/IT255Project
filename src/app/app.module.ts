import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {HomestackComponent} from './homestack/homestack.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ChartsModule} from 'ng2-charts';
// Reducers

import {userReducer} from './reducers/user.reducer';
import {venueCollectionReducer} from './reducers/venue-collection.reducer';
import {statisticsReducer} from './reducers/statistics.reducer';
import {venueReducer} from './reducers/venue.reducer';
// Effects
import {UserEffects} from './effects/user.effects';
//
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import firebase from 'firebase';
import initializeApp = firebase.initializeApp;

import {environment} from '../environments/environment';
import {CollectionComponent} from './collection/collection.component';

import {LoadingComponent} from './loading/loading.component';
import {MyLineChartComponent} from './my-line-chart/my-line-chart.component';
import {checkinReducer} from './reducers/checkins.reducer';
import {messageReducer} from './reducers/message.reducer';
import {MessageComponent} from './message/message.component';
import {menuReducer} from './reducers/menu.reducer';
import {PhotoModalComponent} from './photo-modal/photo-modal.component';
import {promotionReducer} from './reducers/promotion.reducer';
import {PromotionModalComponent} from './promotion-modal/promotion-modal.component';
import {PromotionComponent} from './promotion/promotion.component';
import {OwnerComponent} from './owner/owner.component';
import {VenueSearchComponent} from './venue-search/venue-search.component';
import {RequestModalComponent} from './request-modal/request-modal.component';
import {RequestComponent} from './request/request.component';
import {requestReducer} from './reducers/request.reducer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HomestackComponent,
    CollectionComponent,
    LoadingComponent,
    MyLineChartComponent,
    MessageComponent,
    PhotoModalComponent,
    PromotionModalComponent,
    PromotionComponent,
    OwnerComponent,
    VenueSearchComponent,
    RequestModalComponent,
    RequestComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({
      user: userReducer,
      venueCollection: venueCollectionReducer,
      venue: venueReducer,
      statistics: statisticsReducer,
      checkins: checkinReducer,
      messages: messageReducer,
      menu: menuReducer,
      promotions: promotionReducer,
      requests: requestReducer,
    }, {}),
    EffectsModule.forRoot([UserEffects]),
    ChartsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
