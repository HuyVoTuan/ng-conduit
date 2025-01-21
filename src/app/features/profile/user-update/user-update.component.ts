import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'conduit-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
