import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Handling http requests to ticketmaster API
// import { Observable } from 'rxjs';
declare const bootstrap: any;


@Component({
  selector: 'app-search',
  template: `<app-event-result></app-event-result>`,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent { 

  keywordErrorShown: boolean = false;
  locationErrorShown: boolean = false;

  keyword: string = '';
  distance: number = 10; 
  category: string = "default"; 
  location: string = '';
  autoDetectLocation: boolean = false;
  events: any[] = [];

  lng: string = '';
  lat: string = '';

  showTable: boolean = false;
  // showDetailTable: boolean = false;

  // flag for showing spinner
  showLoadingSpinner: boolean=false;

  // flag for disappaering attractions-dropdown when the mouse click is not on the keyword input boxx
  doneWithKeywordBox: boolean=false;


  // Flag (be used with backButton) ..... (1) event is clicked [false -> true], (2) submit, clear --> [..-> false]  (3) backbutton is clicked --> [true -> false]
  onDetailTable: boolean =false; // False: currently on result view, True: currently on Details tabs table 

  isDetailsDisplayed: boolean = false;

  

  eventDetails: any;
  venueDetails: any;
  artistDetails: any;
  isValidVenue: boolean= false;
  isValidArtist: boolean = false;
  
  showDetailTable: boolean = false;


  emitSuccessful:boolean = false;

  // Take the requried data from event-result.component.ts and details.component.ts
  //    From Where                   Variable Name
  // _________________________       _______________________
  // event-result.component.ts ::::: eventDetails
  // details.component.ts      ::::: venueDetails, artistDetails, isValidVenue, isValidArtist

  receiveEmitter(event:any): void {
    console.log("this.events ", event);
    this.eventDetails = event.eventDetails;
    this.venueDetails = event.venueDetails;
    this.artistDetails = event.artistDetails;
    this.isValidVenue = event.isValidVenue;
    this.isValidArtist = event.isValidArtist;
    this.showDetailTable = event.showDetailTable;
    this.onDetailTable = event.onDetailTable;

    this.emitSuccessful = true;
    
  }

  receiveEmitterFromDetails(event:any): void {
    this.onDetailTable = event; 
    this.emitSuccessful = true;
  }


  constructor(private router: Router, private http: HttpClient) { }

  attractionClickedFlag: boolean =false;
  ngOnInit(): void {
    document.addEventListener('click', (event) => {
      const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
      const keywordInput = document.getElementById('keywordInput');
      const attractionItems = document.querySelectorAll('.attraction-item'); 
      if (autocompleteDropdown && keywordInput) {
        if (event.target !== autocompleteDropdown && event.target !== keywordInput && this.keyword.trim()==="") {
          this.attractions = [];
          attractionItems.forEach(item => {
            if (item.contains(event.target as Node)) {
              this.attractionClickedFlag = true;
            }
          });
          if (!this.attractionClickedFlag) {
            this.doneWithKeywordBox = true;
          }
        }
      }
    });
  }

  // since doneWithKeywordBox stops the keyword from being replaced with the clicked attraction. 
  // I set a timeout so that the keyword can be switched with the clicked attraction.
  onBlur(): void {
    setTimeout(() => {
      if (!this.attractionClickedFlag) {
        this.doneWithKeywordBox = true;
      }
      this.attractionClickedFlag = false;
    }, 200);    
  }




 
  attractions: any[] = [];
  onSearchInput() {
    this.keywordErrorShown = false;

    // attraction autocomplete call
    if (this.keyword.trim() === '') {
      this.attractions = [];
      return;
    } else{this.showLoadingSpinner = true;}
    this.http.get<any[]>('https://cs571hw8-381320.wn.r.appspot.com/api/autocomplete', {
      params: {
        keyword: this.keyword
      }
    }).subscribe(data => {
      this.attractions = data;
      this.showLoadingSpinner = false;
    });
  }

  attractionClicked(attraction: string) {
    if (attraction) {
      this.keyword = attraction;
      this.attractions = [];
    }
  }

  // var keywordInput =  document.getElementById("keyword");
  // var keywordInputError = document.getElementById("keyword-error");

//   keywordInput.addEventListener("input", function() {
//     keywordInputError.style.display = "none";
// });
// locationInput.addEventListener("input", function() {
//     locationInputError.style.display = "none";
// });
// keywordInputError.style.display = "block";

// keywordInputError.innerHTML = 
//                 '<div class="k-error"> <div class="exclamation">!</div> &nbsp; Please fill out thie field.&nbsp; </div>'+
//                 '<style> .exclamation {background-color: orange;color: white;width: 1.3em; height: 1.3em;font-size: 1em;text-align: center;}'+
//                     '.k-error{color:black;display: flex;position: absolute; border-radius:2px; top: 217px; left: 50%; transform: translateX(-50%);'+
//                             'background-color: white;padding: 6px; font-size:12px; font-family:"Verdana"; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);animation: fadeIn 1s ease-in-out;}'+
//                     '@keyframes fadeIn {from {opacity: 0;} to {opacity: 1;}}'+
//                     '.k-error::before {content: ""; position: absolute;bottom: 100%;left: 10%;border-width: 10px;border-style: solid; border-color: transparent transparent white transparent;width: 0;height: 0;}'+
//                 '</style>';
//             isValidInput = false;

// Call this function after checking for input validity in validSearch()
// showErrorTooltip(inputElement: HTMLInputElement) {
//   inputElement.classList.add('is-invalid');
//   const tooltipInstance = new bootstrap.Tooltip(inputElement);
//   tooltipInstance.show();
// }

// hideKeywordErrorTooltip() {
//   const keywordInput = document.getElementById('keywordInput') as HTMLInputElement;
//   if (this.keyword.trim() !== '') {
//     // Remove error class and tooltip if keyword input is valid
//     keywordInput.classList.remove('is-invalid');
//     const keywordTooltipInstance = bootstrap.Tooltip.getInstance(keywordInput);
//     if (keywordTooltipInstance) {
//       keywordTooltipInstance.hide();
//     }
//   }
// }
// hideLocationErrorTooltip() {
//   const locationInput = document.getElementById('locationInput') as HTMLInputElement;
//   if (this.location.trim() !== '') {
//     // Remove error class and tooltip if keyword input is valid
//     locationInput.classList.remove('is-invalid');
//     const keywordTooltipInstance = bootstrap.Tooltip.getInstance(locationInput);
//     if (keywordTooltipInstance) {
//       keywordTooltipInstance.hide();
//     }
//   }
// }



// onLocationInput() {
 
  // const locationInput = document.getElementById('location') as HTMLInputElement;
  // if (this.location.trim() !== '') {
  //   // Remove error class and tooltip if location input is valid
  //   locationInput.classList.remove('is-invalid');
  //   const locationTooltipInstance = bootstrap.Tooltip.getInstance(locationInput);
  //   if (locationTooltipInstance) {
  //     locationTooltipInstance.hide();
  //   }
  // }
// }




  

  // Search Start!
  async validSearch(): Promise<void> {

    this.onDetailTable = false;
    this.showDetailTable = false;
    const trimmedKeyword = this.keyword.trim();
    const trimmedLocation = this.location.trim();

    if (trimmedKeyword === '' || (trimmedLocation === '' && !this.autoDetectLocation)) {
      console.log('Invalid input');
    
      // Keyword 
      if (trimmedKeyword === '') {  // Keyword tooltip error pop up
        this.keywordErrorShown = true;


      } else if (trimmedLocation === '') { // location tooltip error message
        this.locationErrorShown = true;

      }
      return;

    } else { 
      // Valid Input Search
      this.showTable = false;

      console.log('Valid input!'); // this.keywordTooltip.close(); // this.locationTooltip.close();
      // console.log('Keyword:', this.keyword);
      // console.log('Distance:', this.distance);
      // console.log('Category:', this.category);
      // console.log('Location:', this.location);
      // console.log('Auto-detect location:', this.autoDetectLocation);

      // Location APIs process 
      let lnglat: any;
      let lat: string = '';
      let lng: string = '';
      if (this.autoDetectLocation) { // checkbox (marked), IPinfo 
        lnglat = await this.getAutoLocationFromIpInfoAPI();
        if (typeof lnglat === "object" && lnglat.latitude && lnglat.longitude) {
          lat = lnglat.latitude.toString();
          lng = lnglat.longitude.toString();
        } 
      } else { // checkbox (unmarked)
        lnglat = await this.getLocationFromGoogleMapsAPI();
        if (typeof lnglat === "object" && lnglat.latitude && lnglat.longitude) {
          lat = lnglat.latitude.toString();
          lng = lnglat.longitude.toString();
        } 
      }
      
      // lets request and receive
      this.updateEvents(trimmedKeyword, this.distance, this.category, lat, lng);
    }
  }

  // helper functions  attraction names
  async updateEvents(keyword: string, distance: number, category: string, lat: string, lng: string): Promise<void> {
    await this.http
      .get<any[]>('https://cs571hw8-381320.wn.r.appspot.com/api/eventresult', {
        params: {
          keyword: keyword,
          distance: distance.toString(),
          category: category,
          location: lat + ',' + lng,
          autoDetectLocation: this.autoDetectLocation.toString(),
        },
      })
      .subscribe((response) => {
        // console.log("herehere", response);
        if (response) {
          this.showTable = true; // 표에 사용할 ticketmaster response successfully retreived 
          this.events = response; 
          // console.log(" For event results table, API Response. this.events \n", this.events);
        }
      });
    }

  // Checkbox (marked)
  async getAutoLocationFromIpInfoAPI() {
    const response = await fetch(`https://ipinfo.io?token=9064bb703f6aa3`);
    const jsondata = await response.json();
    const lat = jsondata.loc.split(",")[0];
    const lng = jsondata.loc.split(",")[1];
    return { latitude: lat, longitude: lng };
  }

  // User's location input to find latitude and longitude
  async getLocationFromGoogleMapsAPI(){
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=AIzaSyDCr5lHYYM6FI-gu9R_ng77DZeB9yC6tkM`);
    const jsondata = await res.json();
    if (jsondata.status === 'OK') {
      return {latitude: jsondata.results[0].geometry.location.lat, longitude: jsondata.results[0].geometry.location.lng};
    } else if (jsondata.status === 'ZERO_RESULTS') {
      return '';
    }
    return ''; // handle others just in case
  }
  
  // If auto-dectect checkbox marked, the location input field cleared
  onChangeAutoDetectLocation(): void {
    if (this.autoDetectLocation) {
      this.location = '';
    }
  }

  // Route clicked
  isActive(route: string) {
    return this.router.url === route;
  }

  activateClearButton(): void {
    this.keyword = '';
    this.distance = 10;
    this.category = 'default';
    this.location = '';
    this.autoDetectLocation = false;
    const checkbox = document.getElementById('auto-detect-location') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }

    this.keywordErrorShown = false;
    this.locationErrorShown = false;



    // Search Results 
    this.showTable = false;
    this.showDetailTable = false; // 
    this.onDetailTable = false;

    this.onDetailTable = false; // when cleared --> defailt: false
    
    // Details 

    // console.log("\n\n\n\n\n\n\n\n\n")
  }
}