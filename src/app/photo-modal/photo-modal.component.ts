import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css']
})
export class PhotoModalComponent implements OnInit {
  @Input() photo: string;
  @Input() venueID: string;
  @Input() menuID: string;

  constructor(public activeModal: NgbActiveModal, public menuService: MenuService) {
  }

  // tslint:disable-next-line:typedef
  async deleteMenu() {
    await this.menuService.deleteMenu(this.venueID, this.menuID);
    await this.menuService.getMenus(this.venueID);
    await this.activeModal.close('Deleted');
  }

  // tslint:disable-next-line:typedef


  ngOnInit(): void {
  }

}
