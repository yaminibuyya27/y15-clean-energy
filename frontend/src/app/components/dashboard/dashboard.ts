import { Component } from '@angular/core';
import { SourceReference } from '../source-reference/source-reference';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SourceReference],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
