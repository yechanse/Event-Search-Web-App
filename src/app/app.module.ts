import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { AgmCoreModule } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps'

import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// import { MatSnackBarModule } from '@angular/material/snack-bar'; 


import { Routes, RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { EventResultComponent } from './event-result/event-result.component';
import { DetailsComponent } from './details/details.component';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';


const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    EventResultComponent,
    DetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatTabsModule,

    GoogleMapsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,

    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
