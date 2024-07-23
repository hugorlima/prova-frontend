import { Component } from '@angular/core';
import treeData from '../../data/data.json';
import { TreeListComponent } from '../../components/tree-list/tree-list.component';
import { Parent } from '../../interfaces/tree-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TreeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  items: Parent[] = [];

  ngOnInit(): void {
    this.items = this.transformData(treeData);
  }

  transformData(data: any): Parent[] {
    return Object.keys(data).map((key) =>
      this.convertChildrenToArray(data[key])
    );
  }

  convertChildrenToArray(obj: any): any {
    if (!obj.children || typeof obj.children !== 'object') {
      return obj;
    }

    const childrenArray = Object.keys(obj.children).map((key) =>
      this.convertChildrenToArray(obj.children[key])
    );
    return {
      ...obj,
      children: childrenArray,
    };
  }
}
