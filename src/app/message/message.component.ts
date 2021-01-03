import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStatistics} from '../models/statistics.model';
import {IMessage} from '../models/message.model';
import {IUser, User} from '../models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: IMessage;
  @Input() user: User;
  @Input() id: string;

  constructor() {
  }

  ngOnInit(): void {
    console.log('Rendering message: ', this.message);
    console.log('Checking user: ', this.user);
  }

}
