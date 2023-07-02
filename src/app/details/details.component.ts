import { Component, ElementRef, ViewChild, Input, OnInit, Renderer2, AfterViewInit, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { MatTabsModule } from '@angular/material/tabs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GoogleMap } from '@angular/google-maps';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-details',
  template: `<app-venue></app-venue>`,

  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    // add your animations here
  ]
})





export class DetailsComponent implements OnInit{ // , AfterViewInit
  @Input() eventDetails: any; // this events json data has 5 keys date, icon, name, genre, venue.
  @Input() venueDetails: any; 
  @Input() artistDetails: any; 
  @Input() isValidVenue!: boolean;
  @Input() isValidArtist!: boolean;




  // send onDetailTable to search component.
  @Output() onDetailTableEmitter = new EventEmitter<boolean>();



  onDetailTable: boolean = false;



  // For Google Map Modal of Venue Tab
  @ViewChild('venueMapModal') venueMapModalRef!: ElementRef; 

  showDetailTable: boolean = false;

  // carousel
  currentArtistIndex: number = 0;

  // venueJSON: any = {};// 
  // venueJSON = this.eventDetails.venue;
  isFavorite: boolean = false; 

  // Show more 
  showMoreOpenHours: boolean = false;
  showMoreGeneralRule: boolean = false;
  showMoreChildRule: boolean = false;

  // For Google Map Modal
  venueLatLng: google.maps.LatLngLiteral ={ lat: 37.7749, lng: -122.4194};

  // fav 
  fav:any[]=[];


  constructor(
    private http: HttpClient, 
    private router: Router,
    private renderer: Renderer2,
    private modalService: NgbModal
    ) { }


  

  ngOnInit(): void {
    // check local storage and double-check the heart status.
    this.isFavorite = this.isEventFavoriteBefore(this.eventDetails);
  }



  ngAfterViewInit(): void {
    // console.log("ngAfterViewInit....");
    const tabLabelContainer = document.querySelector('.mat-mdc-tab-label-container');
    this.renderer.setStyle(tabLabelContainer, 'background-color', '#12bb91');
    this.renderer.setStyle(tabLabelContainer, 'justify-content', 'center');

    const tabLabelList = document.querySelector('.mat-mdc-tab-list');
    this.renderer.setStyle(tabLabelList, 'flex-grow', '0.3');

    const tabFontcolor = document.querySelectorAll('.mdc-tab__text-label');
    tabFontcolor.forEach(label => {
      // console.log("ngAfterViewInit222222");
      this.renderer.setStyle(label, 'color', 'white');
      this.renderer.setStyle(label, 'font-weight', 'bold');
      this.renderer.setStyle(label, 'font-size', '12px');
    });
  }

    // Show more and Show Less
    toggleShowMore(field: string) {
      if (field === "openHours") {
        this.showMoreOpenHours = !this.showMoreOpenHours;
      } else if (field === "generalRule") {
        this.showMoreGeneralRule = !this.showMoreGeneralRule;
      } else if (field === "childRule") {
        this.showMoreChildRule = !this.showMoreChildRule;
      }
    }
   


    // Google Map Modal
    showMap(): void {
      if (this.venueDetails) {
        this.venueLatLng = { lat: parseFloat(this.venueDetails[0].latitude), lng: parseFloat(this.venueDetails[0].longitude) };
        const modal = this.modalService.open(this.venueMapModalRef, { size: 'lg' });
      } else {
        console.error('Error: venueDetails is not defined or empty');
      }
    }

    onCloseMap(): void {
      this.modalService.dismissAll();
    }


    




  // when back clicked!
  backClicked(): void {
    this.onDetailTable = false;
    // console.log("clicked go back!!!!");
    this.onDetailTableEmitter.emit(this.onDetailTable);
  }
  

  // check local storage and return the event is in local storage
  isEventFavoriteBefore(eventDetails:any): boolean {
    const favLocalString = localStorage.getItem('fav');
    const favLocal = favLocalString ? JSON.parse(favLocalString) : [];
    const eventIndex = favLocal.findIndex((event: any) => event.eventId === this.eventDetails.eventId);
    if (eventIndex !== -1) {
      // mark with red heart. event가 local storage에 존재한다.
      return true;
    } else { // doesn't exist mart with empty heart
      return false;
    }
  }


  // when favorites clicked
  AddOrRemoveFavorites(eventDetails:any) {
    if (this.isFavorite) {
      alert('Event removed  to favorites!');
      this.isFavorite = false;
    } else {
      alert('Event added from favorites!');
      this.isFavorite = true;
    }

    const favLocalString = localStorage.getItem('fav');
    const favLocal = favLocalString ? JSON.parse(favLocalString) : [];
    const eventIndex = favLocal.findIndex((event: any) => event.eventId === eventDetails.eventId);

    // remove the index event
    if (eventIndex !== -1) {
      favLocal.splice(eventIndex, 1);
    } else {
        // add the event to the list
        favLocal.push({
            eventId: eventDetails.eventId,
            date: eventDetails.onlydate,
            eventName: eventDetails.eventName,
            category: eventDetails.genre,
            venue: eventDetails.venue
        });
    }
    localStorage.setItem('fav', JSON.stringify(favLocal));
}

}