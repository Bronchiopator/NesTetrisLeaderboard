import { Component, Input } from '@angular/core';
import { Proof } from '../../../model/Proof';
import {
  MultiMatchgroupRegex,
  SingleMatchgroupRegex,
  matchWithGroupId,
  matchWithMultipleGroupIds,
  matches,
} from './embedded-helper';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

const discordMediaLink: MultiMatchgroupRegex = {
  regex:
    /https:\/\/(media|cdn)\.discordapp\.(net|com)\/attachments\/([0-9]{18,}\/[0-9]{18,}\/)([A-Za-z0-9\.\-_~:?#\[\]@!\$&'\(\)\*\+,;%]*(\.jpg|\.png|\.mp4|\.mov))/,
  /// 0 link, 5 filending
  matchGroupIndeces: [0, 5],
};
const discordChannelLink: SingleMatchgroupRegex = {
  regex:
    /https:\/\/discord\.com\/channels\/([0-9]{18,}\/[0-9]{18,}\/[0-9]{18,})/,
  matchGroupIndex: 0,
};

enum DiscordType {
  video,
  image,
  channel,
  unknown,
}

@Component({
  selector: 'app-embedded-discord',
  standalone: true,
  imports: [MatButtonModule],
  // this does not work, because of CORS it does not.
  // new strategy. On button click only open the one where we can embedd it,
  // all other just open into a new tab
  // that means we delete this whole class.
  template: `
    @switch (urlType) { @case (DiscordType.video) {
    <video [src]="proofURL"></video>
    } @case (DiscordType.image) {
    <img [src]="proofURL" />
    } @case (DiscordType.channel) {
    <div>Link to Discord Channel</div>
    <a mat-flat-button [href]="proofURL" color="primary">Enter</a>
    } @case (DiscordType.unknown) { unknown } @default { Default case } }
  `,
  styles: ``,
})
export class EmbeddedDiscordComponent {
  @Input({ required: true }) data!: Proof;
  DiscordType = DiscordType;
  urlType: DiscordType = DiscordType.unknown;
  proofURL?: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    if (this.data?.link) {
      this.setVideoUrl(this.data.link);
    }
  }

  public static isDiscord(unsanitizedUrl: string): boolean {
    return (
      matches(unsanitizedUrl, discordMediaLink.regex) ||
      matches(unsanitizedUrl, discordChannelLink.regex)
    );
  }

  private setVideoUrl(unsanitizedUrl: string) {
    let fileLink = matchWithMultipleGroupIds(unsanitizedUrl, discordMediaLink);
    if (fileLink[0] && fileLink[1]) {
      switch (fileLink[1]) {
        case '.jpg':
        case '.png':
          this.urlType = DiscordType.image;
          break;
        case '.mp4':
        case '.mov':
          this.urlType = DiscordType.video;
          break;
        default:
          this.urlType = DiscordType.unknown;
          break;
      }
      this.proofURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        fileLink[0]
      );
      return;
    }

    let channelLink = matchWithGroupId(unsanitizedUrl, discordChannelLink);
    if (channelLink) {
      this.urlType = DiscordType.channel;
      this.proofURL =
        this.sanitizer.bypassSecurityTrustResourceUrl(channelLink);
      return;
    }
    this.urlType = DiscordType.unknown;
  }
}
