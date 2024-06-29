import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sectionSelected = new EventEmitter<string>();
  @Output() btnGroupSelected = new EventEmitter<string>();

  activeSection: string = 'measurements';
  activeBtnGroup: string = "compact";

  setActiveSection(section: string) {
    this.activeSection = section; // метод для установки активного раздела
    this.sectionSelected.emit(section); // отправляем выбранный раздел родительскому компоненту
  }

  setActiveBtnGroup(group: string) {
    this.activeBtnGroup = group;
    this.btnGroupSelected.emit(group);
  }
}
