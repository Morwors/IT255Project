import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MenuService} from '../services/menu.service';
import {IVenue} from '../models/venue.model';
import {VenueService} from '../services/venue.service';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent implements OnInit {

  @Input() venue: IVenue;
  @Input() uid: string;

  constructor(public activeModal: NgbActiveModal, public venueService: VenueService) {
  }

  async sendRequest(): Promise<void> {
    await this.venueService.sendRequest(this.uid, this.venue.uid);
    await this.activeModal.close('Sent Request');
  }

  ngOnInit(): void {
  }

}
