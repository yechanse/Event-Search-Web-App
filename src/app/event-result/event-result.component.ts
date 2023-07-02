import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-event-result', 
  template: `<app-details></app-details>`,
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.css']
})
export class EventResultComponent implements OnInit {
  @Input() events: any;


  // For Event Details Tab
  eventDetails: any = []; 
  showDetailTable: boolean = false;

  // For Artists/Teams Tab
  artistDetails: any= {};

  // For Venue Tab
  venueDetails: any = {};
  isValidVenue: boolean = false; // if false, display no records on the venue tab.
  isValidArtist: boolean = false;  
  onDetailTable: boolean = false;

  data_combined: any ;

  @Output() dataEmitter = new EventEmitter<any>();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  receiveDetailBoolean(event:any){
    this.onDetailTable = event.onDetailTable;
  }

  // Event click
  async displayDetailCard(event: any) {
    this.showDetailTable = false;

    // Get Event Details JSON (Event Details Tab API)
    await this.getEventDetailJSON( event.eventID,event.venue);
    this.onDetailTable = true;
  }


  assignEmit(): void {
    this.data_combined = {
      eventDetails: this.eventDetails,
      venueDetails: this.venueDetails,
      artistDetails:  this.artistDetails,
      isValidVenue: this.isValidVenue,
      isValidArtist: this.isValidArtist,
      showDetailTable: this.showDetailTable,
      onDetailTable: this.onDetailTable
    }
    this.dataEmitter.emit(this.data_combined);  
  }

  // Receive event details
  async getEventDetailJSON(id: string, vname:string) {
    await this.http
      .get<any[]>('https://cs571hw8-381320.wn.r.appspot.com/api/eventdetail', {
        params: {
          eventID: id,
        },
      })
      .subscribe(async (response) => { 
        try {
          // console.log("Event Detail Tab API responser (eventDetails):", response);
          if (response) {
            this.eventDetails = response;
            this.showDetailTable = true; // 
            
            // Get Artists/Teams Details JSON (Spotify Tab API)
            await this.getArtistDetailJSON(vname, this.eventDetails.artistsMusicRelated);
          } 
        } catch (error) {
          console.log("Stroke Error From server because rapid requests");
        }
      });

  }
  

  // venue json request and receive and store it to this.venueDetails
  async getVenueDetailJSON(vname: string){
    await this.http
      .get<any[]>('https://cs571hw8-381320.wn.r.appspot.com/api/venue', {
        params: {
          venueName: vname,
        },
      })
      .subscribe((response) => {
        // console.log(response);
        if (response) {
          this.isValidVenue = true; 
          this.venueDetails = response; 
        } else{
          this.isValidVenue = false;
        }
        this.assignEmit() // 
      }
      );
  }

  async getArtistDetailJSON(vname: string, artistsMusicRelated: []){ // keyword: str,
    await this.http
      .get<any[]>('https://cs571hw8-381320.wn.r.appspot.com/api/spotify', {
        params: {
          artists: JSON.stringify(artistsMusicRelated)
        },
      })
      .subscribe((response) => {
        if (response && Array(response)[0] && Array(response)[0].length > 0 ) {
          this.isValidArtist = true; 
          this.artistDetails = response; 
        } else{
          this.isValidArtist = false;
        }
        this.getVenueDetailJSON(vname);
      }
      );
  }
}






