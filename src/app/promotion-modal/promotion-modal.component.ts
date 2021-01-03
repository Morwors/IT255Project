import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MenuService} from '../services/menu.service';
import {PromotionService} from '../services/promotion.service';

@Component({
  selector: 'app-promotion-modal',
  templateUrl: './promotion-modal.component.html',
  styleUrls: ['./promotion-modal.component.css']
})
export class PromotionModalComponent implements OnInit {
  @Input() venueID: string;


  dateFrom: any;

  dateTo: any;

  promotionDescription: string;

  constructor(public activeModal: NgbActiveModal, public promotionService: PromotionService) {
  }

  // tslint:disable-next-line:typedef
  async postPromotion() {
    this.dateFrom = new Date(this.dateFrom).getTime();
    this.dateTo = new Date(this.dateTo).getTime();
    await this.promotionService.sendPromotion(this.venueID, this.dateFrom, this.dateTo, this.promotionDescription);
    await this.promotionService.clearPromotions();
    await this.promotionService.getPromotions(this.venueID);
    await this.activeModal.close('Success');
  }

  // tslint:disable-next-line:typedef


  ngOnInit(): void {
  }

}
