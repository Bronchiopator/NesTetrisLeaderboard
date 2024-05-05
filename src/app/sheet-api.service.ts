import { Injectable, OnInit } from '@angular/core';
import {sheets_v4, sheets, AuthPlus, auth } from '@googleapis/sheets';

const apiKey: string = 'AIzaSyDDta7RwA0cAD3fqbaqrSt9BDTVelnjHY4';
const spreadsheetId: string = '1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI';
@Injectable({
  providedIn: 'root',
})
export class SheetApiService {

  constructor() {}
test(){
  let v4Sheet: sheets_v4.Sheets = sheets({ version: 'v4', auth: apiKey });
   v4Sheet.spreadsheets.values.get(
      {
        spreadsheetId: spreadsheetId,
        range: 'NTSC 0-19 Score!A:K',
      },
      (err: any, res: any) => {
        if (err) {
          console.error('The API returned an error.');
          throw err;
        }
        const rows = res.data.values;
        if (rows.length === 0) {
          console.log('No data found.');
        } else {
          console.log('Name, Major:');
          for (const row of rows) {
            // Print columns A and E, which correspond to indices 0 and 4.
            console.log(`${row[0]}, ${row[4]}`);
          }
        }
      }
    );
}
  getClomuns() {
    // let v4Sheet: sheets_v4.Sheets = sheets('v4');
    // v4Sheet.spreadsheets.values.get(
    //   {
    //     fields: apiKey,
    //     spreadsheetId: spreadsheetId,
    //     range: 'NTSC 0-19 Score!A:K',
    //   },
    //   (err: any, res: any) => {
    //     if (err) {
    //       console.error('The API returned an error.');
    //       throw err;
    //     }
    //     const rows = res.data.values;
    //     if (rows.length === 0) {
    //       console.log('No data found.');
    //     } else {
    //       console.log('Name, Major:');
    //       for (const row of rows) {
    //         // Print columns A and E, which correspond to indices 0 and 4.
    //         console.log(`${row[0]}, ${row[4]}`);
    //       }
    //     }
    //   }
    // );
  }
}
