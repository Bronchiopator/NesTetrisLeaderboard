import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Proof, ProofType } from '../../model/Proof';
import { SheetApiService } from '../sheet-api.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { EmbeddedDiscordComponent } from './embedded-displays/embedded-discord.component';
import { EmbeddedTwitchComponent } from './embedded-displays/embedded-twitch.component';
import { EmbeddedYoutubeComponent } from './embedded-displays/embedded-youtube.component';
import { PseudoSummaryComponent } from './pseudo-summary/pseudo-summary.component';
import { EmbeddedImageComponent } from './embedded-displays/embedded-image.component';
import { MatButtonModule } from '@angular/material/button';

MatCardModule;
enum DisplayProof {
  Youtube = 'Youtube',
  Twitch = 'Twitch',
  Discord = 'Discord',
  ClipfishVideo = 'ClipfishVideo',
  NotLoadable = 'Not Loadable',
  INIT = 'INIT',
  GenericImage = 'GenericImage',
  Unknown = 'Unknown',
}
@Component({
  selector: 'app-proof-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    EmbeddedImageComponent,
    EmbeddedTwitchComponent,
    EmbeddedYoutubeComponent,
    EmbeddedDiscordComponent,
    PseudoSummaryComponent,
  ],
  templateUrl: './proof-dialog.component.html',
  styleUrl: './proof-dialog.component.scss',
})
export class ProofDialogComponent {
  DisplayProof = DisplayProof;
  type: DisplayProof = DisplayProof.INIT;
  hostname:string=new URL(this.data.link??'').hostname;

  constructor(
    public dialogRef: MatDialogRef<ProofDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proof,
    public service: SheetApiService
  ) {
    console.log('dialog', data);
    this.type = this.calculateProofType();
  }

  private calculateProofType(): DisplayProof {
    console.log('url:', this.data.link);
    if (!this.data.link) return DisplayProof.NotLoadable;
    if (EmbeddedYoutubeComponent.isYoutube(this.data.link)) {
      return DisplayProof.Youtube;
    }
    if (EmbeddedTwitchComponent.isTwitch(this.data.link)) {
      return DisplayProof.Twitch;
    }
    if (EmbeddedDiscordComponent.isDiscord(this.data.link)) {
      return DisplayProof.Discord;
    }
    // TODO Check
    // - Discord images
    // - Discord videos
    // - generic images
    // - generic video
    // - clipfish?

    return DisplayProof.Unknown;
  }

  private getDescriptionText(): string {
    switch (this.data.proofType) {
      case ProofType.VideoPlus:
        return "Video of entire game supported by handcam, clear controller audio, or other live verification that's been verified by a leaderboard mod; available for new scores or old 1.3+ scores.";
      case ProofType.Video:
        return 'Video of entire game, including non-live recording methods such as history viewer or maxoutclub replays.';
      case ProofType.PartialVideo:
        return 'Video of some amount of gameplay; video of topping out, rocket screen, or score entry is not included in this category, and falls under images.';
      case ProofType.Image:
        return 'Image demonstrating a score.';
      case ProofType.Claim:
        return 'No evidence of score.';
      case ProofType.Lost:
        return 'Evidence of score no longer exists, but was at one point seen and verified.';
      default:
        return '';
        break;
    }
  }

  getSummary(): { title: string; description: string } {
    return {
      title: `Term '${this.data.proofType}' Explanation`,
      description: this.getDescriptionText(),
    };
  }
}
