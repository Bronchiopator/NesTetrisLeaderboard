import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme = this._darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    if (isDarkTheme) {
      this.document.body.setAttribute('data-theme','dark')
    } else {
      this.document.body.setAttribute('data-theme','light')
    }
    this._darkTheme.next(isDarkTheme);
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.classList.add('mat-app-background');
  }
}
