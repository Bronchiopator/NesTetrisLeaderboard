import { Component } from '@angular/core';
import { SheetApiService } from '../sheet-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sheet-api-test',
  standalone: true,
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './sheet-api-test.component.html',
  styleUrl: './sheet-api-test.component.scss',
})
export class SheetApiTestComponent {
  text: string = 'test';
  constructor(private servie: SheetApiService) {}
  execute(){
    this.servie.getClomuns();
  }
}
