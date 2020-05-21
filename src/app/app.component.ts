
import { SettingsService } from './services/service.index';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'propietas';
  constructor( public _ajustes: SettingsService) {
    _ajustes.guardarAjustes();
  }
}
