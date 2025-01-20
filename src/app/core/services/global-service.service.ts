import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Define types for toast messages
export enum ToastType {
  Success = 'success',
  Error = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // #region Toast
  private displayToast(
    message: string,
    type: ToastType,
    positionClass: string
  ): void {
    this.toastrService[type](message, '', { positionClass });
  }

  showMessage({
    message,
    params,
    type = ToastType.Success,
  }: {
    message: string;
    type?: ToastType;
    params?: Record<string, any>;
  }): void {
    const translatedMessage = this.translateService.instant(message, params);

    const positionClass =
      type === ToastType.Success ? 'toast-bottom-center' : 'toast-bottom-right';

    this.displayToast(translatedMessage, type, positionClass);
  }
  // #endregion Toast
}
