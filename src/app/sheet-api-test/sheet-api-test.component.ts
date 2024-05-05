import { Component } from '@angular/core';
import { SheetApiService } from '../sheet-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TetrisTableRow } from '../../model/TetrisTableRow';
import { DataSource } from '@angular/cdk/table';

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
  text: string = 'test';
  constructor(private servie: SheetApiService) {}
  execute() {
    this.servie.getClomuns().subscribe((x) => console.log(x));
  }
}
