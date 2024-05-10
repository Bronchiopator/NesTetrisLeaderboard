import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const apiKey: string = 'AIzaSyDDta7RwA0cAD3fqbaqrSt9BDTVelnjHY4';
const spreadsheetId: string = '1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI';
const ntscFullScore: string = 'NTSC 0-19 Score!A:H';
const ntscFullScoreNotes: string = 'NTSC 0-19 Score!I:J';
const ntscFullScoreProof: string = 'NTSC 0-19 Score!K:K';
const ntscFullScoreWithCrash: string = 'NTSC 0-19 Score w/ Crash!A:K';
const ntsc19Score: string = 'NTSC 19 Score!A:J';
const ntsc29Score: string = 'NTSC 29 Score!A:J';
const ntsc29Line: string = 'NTSC 29 Lines!A:J';
const ntscLevel: string = 'NTSC Level Lines!A:K';
// GET https://sheets.googleapis.com/v4/spreadsheets/[SPREADSHEETID]/values:batchGet?key=[YOUR_API_KEY] 

@Injectable({
  providedIn: 'root',
})
export class SheetApiService {
  constructor(private client: HttpClient) {}
  getRange(range:string):Observable<object> {
    return this.client.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    );
  }

  getNtscFullScore():Observable<object> {
    return this.getRange(ntscFullScore);
  }
}
