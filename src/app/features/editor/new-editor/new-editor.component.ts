import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'codnuit-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
