import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgClass } from '@angular/common';
import { Parent } from '../../interfaces/tree-list';

@Component({
  selector: 'app-tree-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './tree-list.component.html',
  styleUrl: './tree-list.component.scss',
})
export class TreeListComponent implements OnInit {
  @Input() items: Parent[] = [];
  @Input() isParent: boolean = false;
  @Input() item?: Parent = undefined;

  ngOnInit(): void {}

  togglePlusMinus(item: Parent) {
    item.active = !item.active;

    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => this.togglePlusMinus(child));
    }
  }

  initiateCheckboxesChecker(event: Event) {
    let check = event.target as HTMLInputElement;
    const nodeArray = (
      selector: string,
      parent: Document | HTMLElement = document
    ) => [].slice.call(parent.querySelectorAll(selector)) as HTMLInputElement[];

    const allThings = nodeArray('input[type="checkbox"]');

    if (allThings.indexOf(check) === -1) return;

    const children = nodeArray('input', check.parentNode as HTMLElement);
    children.forEach((child) => (child.checked = check.checked));

    while (check) {
      const parentLi = check.closest('ul') as HTMLElement;
      console.log('parentLi', parentLi);
      if (!parentLi) break;

      const parent = parentLi.querySelector('input') as HTMLInputElement | null;
      console.log('parent', parent);
      if (!parent) break;

      const siblingsUl = parent
        .closest('li')
        ?.querySelector('ul') as HTMLElement;
      console.log('siblingsUl', siblingsUl);
      if (!siblingsUl) break;

      const siblings = nodeArray('input', siblingsUl);

      const checkStatus = siblings.map((sibling) => sibling.checked);
      const every = checkStatus.every(Boolean);
      const some = checkStatus.some(Boolean);

      // console.log(parent);

      parent.checked = every;
      parent.indeterminate = !every && some;
      // document.querySelector('parent-item').indeterminate = !every && some;

      if (parent === check) break;
      check = parent;
    }
  }
}
