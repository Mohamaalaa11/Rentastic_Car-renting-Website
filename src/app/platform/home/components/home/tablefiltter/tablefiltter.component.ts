import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tablefiltter',
  templateUrl: './tablefiltter.component.html',
  styleUrl: './tablefiltter.component.css'
})
export class TablefiltterComponent {
  filteredCars!: any[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filteredCars = history.state.filteredCars;
  }

}
