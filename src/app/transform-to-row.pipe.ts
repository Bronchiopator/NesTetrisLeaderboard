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
        proofLabel: row[row.length - 1],
        proofLink: '',
      } as TetrisTableRow;
    } catch (error) {
      console.log('parsing of failed ', row, '. Error: ', error);
      return null;
    }
  }

  private getNotes(row: string[]): string {
    //notes and proof exists
    if (row.length > 7) {
      return row.slice(8, -1).join('');
      //last element is proof link
      // if(row[row.length - 1]==){

      // }
    }
    return '';
  }
  private getProof() {}

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
    // return Proof[proof as keyof typeof Proof] ?? Proof.Lost;

    var result=Object.keys(Proof).filter(key=>{
      return proof==Proof[key as keyof typeof Proof]
    })
    return result.length>0?result[0] as Proof:Proof.Lost;
  }
}

//['', 'Name', 'Cr', 'Score', 'Platform', 'Style', 'Proof', 'Vid PB', 'Notes', '', 'Proof Link']
//['1', 'Alex Thach', '', '16700760', 'Console', 'Roll', 'Video+', '16700760', 'WR, on GymV5 = no crash & wrong colors', '', 'YouTube']
