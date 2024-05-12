import { Pipe, PipeTransform } from '@angular/core';
import { TetrisTableRow } from '../model/TetrisTableRow';
import { InputMethod } from '../model/InputMethod';
import { ProofType } from '../model/Proof';
import { GamePlatform } from '../model/GamePlatform';

// Scheme returned by the api. All properties are received as strings and have to be parsed
// [
//   [
//  0   ranking,
//  1   name,
//  2   score,
//  3   crash(boolean true ='*' false=''),
//  4   platform(emulator/console),
//  5   playStyle,
//  6   proofType,
//  7   vidPB(sometimes not set)
//  8   notes (should always be set)
//  9   proofLabel (description where the link is saved, not always set)
//  10  proofLink (url to the proof, not always set, sometimes 404s)
//   ]
// ]

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
        playStyle: this.ConvertStringtoStyle(row[5]),
        proofType: this.ConvertStringtoProof(row[6]),
        proof: {
          linkLable: row[9] ?? '',
          proofType: this.ConvertStringtoProof(row[6]),
          link: row[10] ?? '',
        },
        videoPersonalBest: this.getVideoPb(row),
        //does not always work, when there is no proof it will default to notes
        notes: row[8],
      } as TetrisTableRow;
    } catch (error) {
      console.log('parsing of failed ', row, '. Error: ', error);
      return null;
    }
  }

  private getVideoPb(row: string[]): number {
    let vidPbScore = parseInt(row[7]);
    if (isNaN(vidPbScore)) {
      return 0;
    } else {
      return vidPbScore;
    }
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
      let result = Object.keys(InputMethod).filter((key) => {
        return singleString == InputMethod[key as keyof typeof InputMethod];
      });
      //TODO: fox Partial video prooftype
      //Not working for Partial Video, since the Tag is P.Video
      convertedStyles.push(
        result.length > 0
          ? InputMethod[result[0] as keyof typeof InputMethod]
          : InputMethod.Roll
      );
    }
    return convertedStyles;
  }

  private ConvertStringtoProof(proof: string): ProofType {
    // old way gets the enum title not value
    // return Proof[proof as keyof typeof Proof] ?? Proof.Lost;

    let result = Object.keys(ProofType).filter((key) => {
      return proof == ProofType[key as keyof typeof ProofType];
    });
    //TODO: fox Partial video prooftype
    //not working for Partial Video, since the Tag is P.Video
    return result.length > 0
      ? ProofType[result[0] as keyof typeof ProofType]
      : ProofType.Lost;
  }
}
