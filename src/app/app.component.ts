import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedSection: string = 'measurements'; // По умолчанию выбраны замеры
  splitDirection: 'horizontal' | 'vertical' = 'horizontal';

  onSectionSelected(section: string) {
    this.selectedSection = section;
  }

  onBtnGroupSelected(group: string) {
    this.splitDirection = group === 'compact' ? 'horizontal' : 'vertical';
  }
}
