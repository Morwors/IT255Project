import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IVenueCollection} from '../models/venue-collection.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {VenueCollectionService} from '../services/venue-collection.service';
import {PhotoModalComponent} from '../photo-modal/photo-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestModalComponent} from '../request-modal/request-modal.component';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-venue-search',
  templateUrl: './venue-search.component.html',
  styleUrls: ['./venue-search.component.css']
})
export class VenueSearchComponent implements OnInit {
  venueCollection: Observable<IVenueCollection>;
  venueName: string;

  constructor(private store: Store<AppState>, private venueCollectionService: VenueCollectionService, private modalService: NgbModal, private authenticationService: AuthenticationService) {
    this.venueCollection = store.select('venueCollection');
  }

  ngOnInit(): void {
  }

  async openModal(venue): Promise<void> {
    const modalRef = this.modalService.open(RequestModalComponent);
    modalRef.componentInstance.uid = await this.authenticationService.getUserUID();
    modalRef.componentInstance.venue = venue;

  }

  // tslint:disable-next-line:typedef
  async search() {
    await this.venueCollectionService.searchByName(this.venueName);
    this.venueName = '';
  }

}
