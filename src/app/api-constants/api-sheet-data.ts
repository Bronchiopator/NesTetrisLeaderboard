//List of sheet table names
//NTSC 0-19 Score
//NTSC 0-19 Score w/ Crash
//NTSC 29 Score
//NTSC 29 Lines
//NTSC Maxout Lines
//NTSC 29 Maxout Lines
//NTSC Rollover Lines
//NTSC RNG Manip Score

import { apiKey } from "./api-key";

const spreadsheetId: string = '1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI';
//All different pages in sheet
//NTSC 0-19 Score
export const ntscFullScore: string = 'NTSC 0-19 Score!A:H';
export const ntscFullScoreNotes: string = 'NTSC 0-19 Score!I:J';
export const ntscFullScoreProof: string = 'NTSC 0-19 Score!K:K';
//NTSC 0-19 Score w/ Crash
export const ntscFullScoreWithCrash: string = 'NTSC 0-19 Score w/ Crash!A:K';
//NTSC 19 Score
export const ntsc19Score: string = 'NTSC 19 Score!A:J';
//NTSC 29 Score
export const ntsc29Score: string = 'NTSC 29 Score!A:J';
//NTSC 29 Lines
export const ntsc29Line: string = 'NTSC 29 Lines!A:J';
export const ntscLevel: string = 'NTSC Level Lines!A:K';

const hyperlinkFieldsParameters: string =
  '&fields=sheets(data(rowData(values(formattedValue,hyperlink))))';

export function getValueRequestUrl(range: string): string {
  return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
}

export function getSheetRequestUrl(range: string): string {
  return `https://content-sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?ranges=${range}&includeGridData=true${hyperlinkFieldsParameters}&key=${apiKey}`;
}
