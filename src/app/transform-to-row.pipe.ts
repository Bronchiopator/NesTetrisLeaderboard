import { Pipe, PipeTransform } from '@angular/core';
import { TetrisTableRow } from '../model/TetrisTableRow';
import { InputMethod } from '../model/InputMethod';
import { Proof } from '../model/Proof';
import { GamePlatform } from '../model/GamePlatform';

@Pipe({
  name: 'transformToRow',
  standalone: true,
})
export class TransformToRowPipe implements PipeTransform {
  transform(row: string[], ...args: unknown[]): TetrisTableRow | null {
    try {
      return {
        ranking: +row[0],
        name: row[1],
        crash: row[2] === '*',
        score: +row[3],
        platform: this.ConvertStringtoPlatform(row[4]),
        style: this.ConvertStringtoStyle(row[5]),
        proofType: this.ConvertStringtoProof(row[6]),
        videoPersonalBest: +row[7],
        notes: this.getNotes(row),
        //does not always work, when there is no proof it will default to notes
        proofLabel: row[row.length - 1],
        proofLink: '',
      } as TetrisTableRow;
    } catch (error) {
      console.log('parsing of failed ', row, '. Error: ', error);
      return null;
    }
  }

  private getNotes(row: string[]): string {
    // TODO: implement get notes
    // Notes can be a merged cell, or two seperated cell,
    // with either one or both filled
    // Because of this notws have to be called seperatly.
    return '';
  }
  private getProof() {
    // TODO: implement get Proof link and label
    // The normal request does not contain the hyperlink, just the label.
    // Becuase of this all proofs have to be called seperatly,
    // majorly increasing the calls to the google sheet
  }

  private ConvertStringtoPlatform(platform: string): GamePlatform {
    try {
      return GamePlatform[platform as keyof typeof GamePlatform];
    } catch (error) {
      return GamePlatform.Console;
    }
  }

  private ConvertStringtoStyle(styles: string): InputMethod[] {
    let convertedStyles: InputMethod[] = [];
    let seperadedStyles: string[] = styles.split('+');

    for (const singleString of seperadedStyles) {
      try {
        convertedStyles.push(
          InputMethod[singleString as keyof typeof InputMethod]
        );
      } catch (error) {
        convertedStyles.push(InputMethod.Roll);
      }
    }
    return convertedStyles;
  }

  private ConvertStringtoProof(proof: string): Proof {
    // old way gets the enum title not value
    // return Proof[proof as keyof typeof Proof] ?? Proof.Lost;

    let result = Object.keys(Proof).filter((key) => {
      return proof == Proof[key as keyof typeof Proof];
    });
    //TODO: fox Partial video prooftype
    //not working for Partial Video, since the Tag is P.Video
    return result.length > 0 ? Proof[result[0]as keyof typeof Proof] : Proof.Lost;
  }
}
