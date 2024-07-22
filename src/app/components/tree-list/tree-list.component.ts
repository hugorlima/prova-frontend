import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Parent } from '../../interfaces/tree-list';

@Component({
  selector: 'app-tree-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './tree-list.component.html',
  styleUrl: './tree-list.component.scss',
})
export class TreeListComponent implements OnInit {
  @Input() items: Parent[] = [];
  @Input() isParent: boolean = false;
  active: boolean = false;

  ngOnInit(): void {
    // this.isParent = !this.isParent;
  }

  // Toggle plus minus
  togglePlusMinus() {
    // console.log(event.currentTarget);    
    this.active = !this.active;
  }
}
