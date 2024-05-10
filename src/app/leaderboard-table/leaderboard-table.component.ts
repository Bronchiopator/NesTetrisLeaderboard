import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SheetApiService } from '../sheet-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TetrisTableRow } from '../../model/TetrisTableRow';
import { DataSource } from '@angular/cdk/table';
import { InputMethod } from '../../model/InputMethod';
import { TransformToRowPipe } from '../transform-to-row.pipe';
import { DecimalPipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-leaderboard-table',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatTableModule,MatFormFieldModule,DecimalPipe,MatSortModule],
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.scss',
})
export class LeaderboardTableComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<TetrisTableRow> =
    new MatTableDataSource<TetrisTableRow>([]);
  pipe: TransformToRowPipe;
  displayedColumns: string[] = [
    'ranking',
    'name',
    'score',
    'crash',
    'style',
    'proofType',
    'vidPB',
    'platform',
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  getStyleString(style: InputMethod, isFirst: boolean) {
    return isFirst ? style : '+' + style;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
