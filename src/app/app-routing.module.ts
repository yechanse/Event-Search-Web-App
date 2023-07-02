import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Import the components
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';



const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' }, // Default route
  { path: 'search', component: SearchComponent }, // Search route
  { path: 'favorites', component: FavoritesComponent }, // Favorites route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
