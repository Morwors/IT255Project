import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IPromotion} from '../models/promotion.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  @Input() promotion: IPromotion;
  promotionState: string;
  promotionType: string;
  @ViewChild('promotionContainer', {static: true}) promotionContainer;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.promotionContainer);
    const timeNow = Date.now();
    if (timeNow < this.promotion.date_from) {
      this.promotionState = 'Not Sent';
      this.promotionType = 'warning';
    } else if (timeNow > this.promotion.date_from && timeNow < this.promotion.date_to) {
      this.promotionState = 'Sent';
      this.promotionType = 'success';
    } else if (timeNow > this.promotion.date_to) {
      this.promotionState = 'Finished';
      this.promotionType = 'danger';
    }
  }

}
