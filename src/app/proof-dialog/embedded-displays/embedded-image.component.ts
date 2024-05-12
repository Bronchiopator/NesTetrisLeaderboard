import { Component, Input } from '@angular/core';
import { Proof } from '../../../model/Proof';

@Component({
  selector: 'app-embedded-image',
  standalone: true,
  imports: [],
  template: `<img mat-card-image [src]="data.link" />`,
  styles: ``,
})
export class EmbeddedImageComponent {
  @Input({ required: true }) data!: Proof;
}
