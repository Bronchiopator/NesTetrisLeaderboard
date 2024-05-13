import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SheetApiService } from '../sheet-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TetrisTableRow } from '../../model/TetrisTableRow';
import { InputMethod } from '../../model/InputMethod';
import { TransformToRowPipe } from '../transform-to-row.pipe';
import { DecimalPipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProofButtonComponent } from './proof-button/proof-button.component';

@Component({
  selector: 'app-leaderboard-table',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    DecimalPipe,
    MatSortModule,
    MatTooltipModule,
    ProofButtonComponent,
  ],
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.scss',
})
export class LeaderboardTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<TetrisTableRow> =
    new MatTableDataSource<TetrisTableRow>([]);
  pipe: TransformToRowPipe;
  displayedColumns: string[] = [
    'ranking',
    'name',
    'score',
    'crash',
    'playStyle',
    'proofType',
    'videoPersonalBest',
    'platform',
    'notes',
  ];

  constructor(private servie: SheetApiService) {
    this.pipe = new TransformToRowPipe();
    this.servie.getNtscFullScore().subscribe((x: string[][]) => {
      console.log('table get data', x);
      this.dataSource.data = this.getTransformedData(x);
      //TODO: Debug code remove before full release
      for (const iterator of this.dataSource.data) {
        if (iterator.proof.link != '') {
          console.log(iterator.ranking, iterator.proof.link);
        }
      }
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
    console.log('finished tranformation', data);

    return data;
  }
}
//TODO: Try to 'parallelize' the row transformation
// async function parallel(arr: string[], fn: Function, threads: number = 2) {
//   const result = [];
//   while (arr.length) {
//     const res = await Promise.all(arr.splice(0, threads).map((x) => fn(x)));
//     result.push(res);
//   }
//   return result.flat();
// }
