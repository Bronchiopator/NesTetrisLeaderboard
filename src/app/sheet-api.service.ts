import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const apiKey: string = 'AIzaSyDDta7RwA0cAD3fqbaqrSt9BDTVelnjHY4';
const spreadsheetId: string = '1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI';
const range: string = 'NTSC 0-19 Score!A:K';
// GET https://sheets.googleapis.com/v4/spreadsheets/[SPREADSHEETID]/values:batchGet?key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
@Injectable({
  providedIn: 'root',
})
export class SheetApiService {
  constructor(private client: HttpClient) {}
  getClomuns():Observable<object> {
    let test = this.client.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    );
    console.log(test);
    return test;
  }
}
