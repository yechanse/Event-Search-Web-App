import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})



export class FavoritesComponent implements OnInit {

  favoriteEvents: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const fav = localStorage.getItem('fav');
    if (fav) {
      this.favoriteEvents = JSON.parse(fav);
    }
  }

  removeFavoriteEvent(index: number) {
    this.favoriteEvents.splice(index, 1);
    localStorage.setItem('fav', JSON.stringify(this.favoriteEvents));
    alert('Removed from Favorites!');
  }

  // Functions Starting Here
  isActive(route: string) {
    return this.router.url === route;
  }

}
