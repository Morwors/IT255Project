import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IRequestList} from '../models/request.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {RequestService} from '../services/request.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  requests: Observable<IRequestList>;


  constructor(private store: Store<AppState>, private requestService: RequestService) {
    this.requests = store.select('requests');
  }

  async ngOnInit(): Promise<void> {
    await this.loadRequest();
  }

  async loadRequest(): Promise<void> {
    await this.requestService.getRequests();
  }

}
