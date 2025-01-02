import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ModalAddEventComponent} from './components/modal-add-event.component';
import {NavbarComponent} from './components/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalAddEventComponent, NavbarComponent],
  template: `
    <app-navbar />
    <app-modal-add-event  />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'ngrx-eventsProject';
}
