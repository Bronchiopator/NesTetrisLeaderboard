import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Proof } from '../../../model/Proof';
import { ProofDialogComponent } from '../../proof-dialog/proof-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-proof-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    @if (hasProof(proof)) {
    <button
      (click)="openDialog(proof)"
      (auxclick)="secondaryClickEvent(proof.link!, $event)"
      mat-mini-fab
      color="primary"
      aria-label="Button to open linked Proof"
      matTooltip="Open linked Proof"
    >
      <span class="material-symbols-outlined"> comment_bank </span>
    </button>
    }@else {
    <span>
      {{ proof.link ?? 'nolink' }}
    </span>
    }
  `,
  styles: ``,
})
export class ProofButtonComponent {
  @Input({ required: true }) proof!: Proof;

  constructor(public dialog: MatDialog) {}

  /// QOL. Implemented so the proof button can be middle clicked,
  /// and the proof link opens in a new tab
  secondaryClickEvent(url: string, event: MouseEvent) {
    //check if middle mouse button
    if (event.button == 1) {
      window.open(url, '_blank');
    }
  }
  
  hasProof(proof: Proof): boolean {
    function isValidUrl(urlString: string): boolean {
      try {
        return Boolean(new URL(urlString));
      } catch (e) {
        return false;
      }
    }
    //has no proof by definition
    if (proof.proofType == 'Lost' && proof.proofType != 'Lost') {
      return false;
    }
    //has no proof via no url
    if (!proof.link) {
      return false;
    }
    return isValidUrl(proof.link);
  }

  openDialog(proof: Proof): void {
    const dialogRef = this.dialog.open(ProofDialogComponent, {
      data: proof,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
