import { ThemeService } from './theme.service';
import { Component } from '@angular/core';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'theme-toggle-button',
  standalone: true,
  template: `
    <div class="light-dark-side-placeholder">
      <mat-slide-toggle
        #lightDarkToggle
        class="toggle-light-dark-theme"
        (click)="toggleTheme(lightDarkToggle)"
      >
        <span class="material-symbols-outlined">{{
          (service.isDarkTheme | async) ? 'nightlight_round' : 'wb_sunny'
        }}</span>
      </mat-slide-toggle>
    </div>
  `,
  styles: [
    `
      .light-dark-side-placeholder {
        float: right;
        margin: 10px;
        display: flex;
      }
      span {
        align-self: end;
        color: var(--mat-app-text-color);    
        //i know this is a hack, i dont care. If you want to fix it make a pullrequest
        transform: translate(0px, 2px);
      }
    `,
  ],
  imports: [MatSlideToggleModule, CommonModule],
})
export class ThemeToggleButtonComponent {
  //Hacky workaround to fix MatSlideToggle in style.scss
  constructor(public service: ThemeService) {}

  public toggleTheme(toggle: MatSlideToggle) {
    this.service.setDarkTheme(!toggle.checked);
  }
}
