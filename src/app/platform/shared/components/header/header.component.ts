import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) img = '';
  @Input({ required: true }) beforeSpan = '';
  @Input({ required: true }) contentSpan = '';
  @Input({ required: true }) afterSpan = '';
  @Input({ required: true }) contentBody = '';
}
