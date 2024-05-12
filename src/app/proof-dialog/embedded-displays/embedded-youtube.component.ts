import { Component, Input } from '@angular/core';
import { Proof } from '../../../model/Proof';

@Component({
  selector: 'app-embedded-youtube',
  standalone: true,
  imports: [],
  template: `
    <iframe
      mat-card-image
      width="560"
      height="315"
      [src]="data.link"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `,
  styles: ``,
})
export class EmbeddedYoutubeComponent {
  @Input({required: true}) data!: Proof;
}
