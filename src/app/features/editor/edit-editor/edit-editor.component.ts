import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'codnuit-edit-editor',
  templateUrl: './edit-editor.component.html',
  styleUrls: ['./edit-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
