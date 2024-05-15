import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { Proof } from '../../../model/Proof';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SingleMatchgroupRegex, matchWithGroupId, matches } from './embedded-helper';

const youtubeParameterNoSuggestVideos = '?rel=0';
// Note that currently an id is always 11 characters, but google has not comitted to that and might increase it in the future.
// I have anticipated an increase, but a change of character set would break this.
// If that happens videos containing these new characters in the id would not be matched.
// This is something I cannot anticipate, and for user safety i will not increase the matched characters.
const youtubeIdMatchRegex: SingleMatchgroupRegex = {
  regex:
    /^(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)([A-Za-z0-9_-]{11,})/,
  matchGroupIndex: 2,
};
// Special case for the people who send in a youtube studio link.
// This happened only once, so I am ok with this hyper specific regex.
const youtubeStudioIdMatchRegex: SingleMatchgroupRegex = {
  regex: /^https:\/\/studio\.youtube\.com\/video\/([A-Za-z0-9_-]{11,})\/edit$/,
  matchGroupIndex: 1,
};
@Component({
  selector: 'app-embedded-youtube',
  standalone: true,
  imports: [],
  template: `
    @if(videoUrl){
    <div class="video-container">
      <iframe
        [src]="videoUrl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    }@else {
    <div>
      Could not recognize link. If this is indeed a youtube link please raise an
      issue on github. Link:
      <a [href]="data.link">{{ data.link }}</a>
    </div>
    }
  `,
  styles: `
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  `,
})
export class EmbeddedYoutubeComponent implements OnInit {
  @Input({ required: true }) data!: Proof;
  videoUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.setVideoUrl();
  }

  public static isYoutube(unsanitizedUrl: string): boolean {
    return (
      matches(unsanitizedUrl, youtubeIdMatchRegex.regex) ||
      matches(unsanitizedUrl, youtubeStudioIdMatchRegex.regex)
    );
  }

  private setVideoUrl() {
    let id = this.getYoutubeVideoId(this.data?.link ?? '');
    if (id) {
      this.updateVideoUrl(id);
    }
  }

  private updateVideoUrl(id: string) {
    // These are external links, made by users, which are loaded from a google sheet.
    // I have to sanitzie them first since I am inputting them in an iframe.
    // Specifically to prevent cross-site-scripting
    let combinedUrl =
      'https://www.youtube.com/embed/' + id + youtubeParameterNoSuggestVideos;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(combinedUrl);
  }

  private getYoutubeVideoId(unsanitizedUrl: string): string | undefined {
    let id = matchWithGroupId(unsanitizedUrl, youtubeIdMatchRegex);
    if (id) return id;
    id = matchWithGroupId(unsanitizedUrl, youtubeStudioIdMatchRegex);
    return id;
  }
}
