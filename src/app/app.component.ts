import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedMeasurementId: number | null = 1;
  selectedSection: string = 'measurements';
  splitDirection: 'horizontal' | 'vertical' = 'horizontal';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSplitDirection();
  }

  ngOnInit() {
    this.updateSplitDirection();
  }

  onMeasurementIdChange(id: number) {
    this.selectedMeasurementId = id;
  }

  onSectionSelected(section: string) {
    this.selectedSection = section;
    this.updateSplitDirection();
  }

  onBtnGroupSelected(group: string) {
    this.splitDirection = group === 'compact' ? 'horizontal' : 'vertical';
  }

  private updateSplitDirection() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1024) {
      this.splitDirection = 'vertical';
    } else {
      this.splitDirection = 'horizontal';
    }
  }
}
