import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() sectionSelected = new EventEmitter<string>();
  @Output() btnGroupSelected = new EventEmitter<string>();

  activeSection: string = 'measurements';
  activeBtnGroup: string = 'compact';

  setActiveSection(section: string) {
    this.activeSection = section;
    this.sectionSelected.emit(section);
  }

  setActiveBtnGroup(group: string) {
    this.activeBtnGroup = group;
    this.btnGroupSelected.emit(group);
  }
}
