import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IPromotion} from '../models/promotion.model';
import {IRequest} from '../models/request.model';
import {PromotionService} from '../services/promotion.service';
import {RequestService} from '../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() request: IRequest;
  @Input() index: number;
  @ViewChild('requestContainer', {static: true}) requestContainer;

  constructor(private viewContainerRef: ViewContainerRef, private requestSerive: RequestService) {
  }


  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.requestContainer);
    console.log('Request init:', this.index);
  }

  // tslint:disable-next-line:typedef
  async action(allowed) {
    await this.requestSerive.setOwner(this.request.venue.uid, this.request.user.uid, this.request.id, allowed);
    await this.requestSerive.removeRequest(this.index);

  }

}
