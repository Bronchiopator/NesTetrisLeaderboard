import { Component, OnInit } from '@angular/core';
import { SheetApiService } from '../sheet-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TetrisTableRow } from '../../model/TetrisTableRow';
import { DataSource } from '@angular/cdk/table';
import { InputMethod } from '../../model/InputMethod';
import { TransformToRowPipe } from '../transform-to-row.pipe';

@Component({
  selector: 'app-sheet-api-test',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatTableModule],
  templateUrl: './sheet-api-test.component.html',
  styleUrl: './sheet-api-test.component.scss',
})
export class SheetApiTestComponent {
  dataSource: MatTableDataSource<TetrisTableRow> =
    new MatTableDataSource<TetrisTableRow>([]);
  pipe: TransformToRowPipe;
  displayedColumns: string[] = [
    'ranking',
    'name',
    'crash',
    'score',
    'style',
    'proofType',
    'vidPB',
    // 'notes',
    // 'proofLink',
  ];

  constructor(private servie: SheetApiService) {
    this.pipe = new TransformToRowPipe();
    this.servie.getNtscFullScore().subscribe((x: any) => {
      this.dataSource.data = this.getTransformedData(x.values);
      console.log(x);
    });
  }

  getStyleString(style: InputMethod, isFirst: boolean) {
    return isFirst ? style : '+' + style;
  }
  getTransformedData(values: string[][]): TetrisTableRow[] {
    //skip header line
    let data: TetrisTableRow[] = [];
    for (const iterator of values.slice(1)) {
      data.push(this.pipe.transform(iterator)!);
    }
    return data;
  }
}
//['', 'Name', 'Cr', 'Score', 'Platform', 'Style', 'Proof', 'Vid PB', 'Notes', '', 'Proof Link']
//['1', 'Alex Thach', '', '16700760', 'Console', 'Roll', 'Video+', '16700760', 'WR, on GymV5 = no crash & wrong colors', '', 'YouTube']
// async function parallel(arr: string[], fn: Function, threads: number = 2) {
//   const result = [];
//   while (arr.length) {
//     const res = await Promise.all(arr.splice(0, threads).map((x) => fn(x)));
//     result.push(res);
//   }
//   return result.flat();
// }
