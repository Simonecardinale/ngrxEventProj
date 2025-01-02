import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    Button
  ],
  template: `
    <nav class="py-4 border-b border-b-gray-200 flex gap-x-5 px-5">
      <p-button routerLink="eventi" label="Home" variant="text" />
      <p-button routerLink="prenotazioni" label="Prenotazioni" variant="text" />
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {

}
