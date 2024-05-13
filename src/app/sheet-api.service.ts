import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { GoogleFieldsResult, HyperLink } from '../model/HyperLink';
import {
  getSheetRequestUrl,
  getValueRequestUrl,
  ntscFullScore,
  ntscFullScoreNotes,
  ntscFullScoreProof,
} from './api-constants/api-sheet-data';

@Injectable({
  providedIn: 'root',
})
export class SheetApiService {
  constructor(private client: HttpClient) {}
  getRange(range: string): Observable<{ values: string[][] }> {
    return this.client.get(getValueRequestUrl(range)) as Observable<{
      values: string[][];
    }>;
  }
  getHyperlinkRange(range: string): Observable<GoogleFieldsResult> {
    return this.client.get(
      getSheetRequestUrl(range)
    ) as Observable<GoogleFieldsResult>;
  }
  getNtscFullScore(): Observable<string[][]> {
    // It should be able to reduce this to one single call.
    // If I call everything via the sheet method (see getHyperlinkRange method),
    // not the sheet.get method only one call is necessary.
    // But this would mean that I would have to manually
    // detect empty/missing fields,
    // and also catch the edge cases with merged cells.
    // This is possible, but a major pain.
    let noteObs = this.getRange(ntscFullScoreNotes);
    let tableObs = this.getRange(ntscFullScore);
    let proofLinkObs = this.getProoflink();
    return combineLatest([tableObs, noteObs, proofLinkObs]).pipe(
      map(
        (
          TableAndNotes: [
            { values: string[][] },
            { values: string[][] },
            HyperLink[]
          ]
        ) => {
          return this.addNotesToTable(TableAndNotes);
        }
      )
    );
  }

  getProoflink(): Observable<HyperLink[]> {
    return this.getHyperlinkRange(ntscFullScoreProof).pipe(
      map((apiresult: GoogleFieldsResult) => {
        console.log('map proof link', apiresult);
        return apiresult.sheets[0].data[0].rowData.map((x) => {
          if (Object.keys(x).length != 0) {
            return x.values[0];
          }
          return { formattedValue: 'No Proof', hyperlink: '' };
        });
      })
    );
  }

  private addNotesToTable(
    doubleRequestArray: [
      { values: string[][] },
      { values: string[][] },
      HyperLink[]
    ]
  ): string[][] {
    for (let index = 0; index < doubleRequestArray[0].values.length; index++) {
      let row: string[] = doubleRequestArray[0].values[index];
      let note: string = (doubleRequestArray[1].values[index] ?? ['']).join(
        ' '
      );
      let link: HyperLink = doubleRequestArray[2][index] ?? {
        formattedValue: 'Failed to parse Proof',
        hyperlink: '',
      };
      //array is sometimes short a few  values, e.g. no vidpbscore submitted. This does pad it out.
      this.padRow(row, 8);
      row.push(note);
      row.push(link.formattedValue ?? 'Proof');
      row.push(link.hyperlink ?? '');
    }
    return doubleRequestArray[0].values;
  }

  private padRow(row: string[], padTillLengthAt: number) {
    if (row.length < padTillLengthAt) {
      for (let index = 0; index < 8 - row.length; index++) {
        row.push('');
      }
    }
  }
}
