import { Component, Input } from '@angular/core';
import { Proof } from '../../../model/Proof';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { SingleMatchgroupRegex, matchWithGroupId, matches } from './embedded-helper';

const twitchIdRegex: SingleMatchgroupRegex = {
  regex: /^https\:\/\/www\.twitch\.tv\/videos\/([0-9]{10})/,
  matchGroupIndex: 1,
};
const twitchTimestampRegex: SingleMatchgroupRegex = {
  regex: /(\?|&)t=([0-9dhms]*)/,
  matchGroupIndex: 2,
};
@Component({
  selector: 'app-embedded-twitch',
  standalone: true,
  imports: [],
  template: `
    @if(videoUrl){
    <div class="video-container">
      <iframe
        [src]="videoUrl"
        title="Twitch video player"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    }@else {
    <div>
      Could not recognize link. If this is indeed a twitch link please raise an
      issue on github. Link:
      <a [href]="data.link">{{ data.link }}</a>
    </div>
    }
  `,
  styles: ``,
})
export class EmbeddedTwitchComponent {
  @Input({ required: true }) data!: Proof;
  videoUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.data?.link) {
      this.setVideoUrl(this.data.link);
    }
  }

  public static isTwitch(unsanitizedUrl: string): boolean {
    return matches(unsanitizedUrl, twitchIdRegex.regex);
  }

  private setVideoUrl(unsanitizedUrl: string) {
    let id = matchWithGroupId(unsanitizedUrl, twitchIdRegex);
    let timestamp = matchWithGroupId(unsanitizedUrl, twitchTimestampRegex);
    if (id) {
      this.updateVideoUrl(id, timestamp);
    }
  }

  private updateVideoUrl(id: string, timestamp: string | undefined) {
    // These are external links, made by users, which are loaded from a google sheet.
    // I have to sanitzie them first since I am inputting them in an iframe.
    // Specifically to prevent cross-site-scripting
    let combinedUrl = 'https://player.twitch.tv/?video=' + id + `&parent=${new URL(window.location.href).hostname}`;
    if (timestamp) {
      combinedUrl = combinedUrl + '&t=' + timestamp;
    }
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(combinedUrl);
  }
}
