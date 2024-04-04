import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-toaster',
  templateUrl: './status-toaster.component.html',
  styleUrl: './status-toaster.component.css',
})
export class StatusToasterComponent {
  @Input({ required: true }) status = true;
  @Input({ required: true }) header = '';
  @Input({ required: true }) bodyhead = '';
  @Input({}) bodyheadSpan = '';
  @Input({ required: true }) content = '';
}
