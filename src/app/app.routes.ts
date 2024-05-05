import { Routes } from '@angular/router';
import { SheetApiTestComponent } from './sheet-api-test/sheet-api-test.component';

export const routes: Routes = [
  { path: 'test', component: SheetApiTestComponent },
  { path: '', pathMatch: 'full', redirectTo: 'test' },
];
