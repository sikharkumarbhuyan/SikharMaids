import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchId: any = '';
  @Output() item = new EventEmitter<number>();

  searchUser() {
    this.item.emit(this.searchId);
  }

}
