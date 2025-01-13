import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'conduit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarCollaspe', { static: true }) navbarCollaspe: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  /**
   * Close the Bootstrap 5 navbar collapse
   */
  closeNavbar() {
    if (this.navbarCollaspe.nativeElement.classList.contains('show')) {
      this.renderer.removeClass(this.navbarCollaspe.nativeElement, 'show');
    }
  }
}
