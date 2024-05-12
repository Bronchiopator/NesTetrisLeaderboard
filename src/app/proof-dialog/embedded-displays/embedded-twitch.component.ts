import { Component, Input } from '@angular/core';
import { Proof } from '../../../model/Proof';

@Component({
  selector: 'app-embedded-twitch',
  standalone: true,
  imports: [],
  template: ` <p>embedded-twitch works!</p> `,
  styles: ``,
})
export class EmbeddedTwitchComponent {
  @Input({ required: true }) data!: Proof;
}
