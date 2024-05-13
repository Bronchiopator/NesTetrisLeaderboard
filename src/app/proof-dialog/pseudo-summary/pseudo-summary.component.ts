import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';

interface TextNode {
  text: string;
  children?: TextNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
// Angular Material does not (currently) provide a Summary-/Inplace-Component,
// and i did not ike the look of the expansion panel in this case.
// So this is a hijacked tree component that achieves something similair.
// Note that this does not reserve the width of the description text, since it only gets injected into the dom on button click 
@Component({
  selector: 'app-pseudo-summary',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule],
  template: `
    <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <mat-tree-node *matTreeNodeDef="let node">
        <button mat-icon-button disabled></button>
        {{ node.name }}
      </mat-tree-node>
      <mat-tree-node *matTreeNodeDef="let node; when: hasChild">
        <button
          mat-icon-button
          matTreeNodeToggle
          [attr.aria-label]="'Toggle ' + node.name"
        >
          <span class="mat-icon-rtl-mirror material-symbols-outlined">
            {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
          </span>
        </button>
        {{ node.name }}
      </mat-tree-node>
    </mat-tree>
  `,
  styles: ``,
})
export class PseudoSummaryComponent implements OnInit {
  @Input({ required: true }) summary!: { title: string; description: string };

  private _transformer = (node: TextNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.text,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {}
  ngOnInit(): void {
    this.dataSource.data = [
      {
        text: this.summary.title,
        children: [
          {
            text: this.summary.description,
          },
        ],
      } as TextNode,
    ];
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
