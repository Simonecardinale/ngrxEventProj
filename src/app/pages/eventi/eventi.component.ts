import {Component, inject, OnInit, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {eventiFeatures, selectEventi} from '../../store/eventi/eventi.features';
import {EventiActions} from '../../store/eventi/eventi.actions';
import {TableModule} from 'primeng/table';
import { PopoverModule } from 'primeng/popover';
import {Eventi} from '../../model/eventi';
import {DatePipe} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {ModalAddEventActions} from '../../store/modalAddEvent/modalAddEvent.actions';

@Component({
  selector: 'app-eventi',
  imports: [
    TableModule, PopoverModule, DatePipe, InputText, Button, FormsModule
  ],
  template: `
    <div class="flex flex-col px-24 gap-y-4 my-3">
      <div class="flex justify-center gap-x-2 items-center">
        <input [(ngModel)]="filterValue" class="self-center" type="text" pInputText />
        <p-button (click)="filterEventi()" icon="pi pi-search" aria-label="Search" />
        <p-button severity="danger" (click)="resetTable()" aria-label="Reset">Reset</p-button>
        <p-button severity="help" (click)="openModalAddEvent({})" aria-label="AddEvent">Add event</p-button>
      </div>

      <p-table [value]="eventi()" [tableStyle]="{ 'min-width': '50rem' }"  [rows]="5">
        <ng-template #header>
          <tr>
            <th class="w-1/6">Id <p-button (click)="sortBy('id')" variant="text" icon="pi pi-sort" aria-label="Sort" /></th>
            <th class="w-1/6">Title</th>
            <th class="w-1/6">Date</th>
            <th class="w-1/6" >Location</th>
            <th class="w-1/6">Total Seats </th>
            <th class="w-1/6">Available Seats</th>
            <th class="w-1/6"></th>
          </tr>
        </ng-template>
        <ng-template #body let-product>
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.date | date: "yyyy-MM-dd" }}</td>
            <td>{{ product.location }}</td>
            <td>{{product.totalSeats}}</td>
            <td>{{product.availableSeats}}</td>
            <td>
              <p-button (click)="openModalAddEvent(product)" label="Edit" severity="info" />
            </td>
          </tr>
        </ng-template>
      </p-table>

    </div>
  `,
  styles: ``
})
export default class EventiComponent implements OnInit {

  store = inject(Store);
  eventi: Signal<Eventi[]> = this.store.selectSignal(selectEventi);
  filterValue: string = "";

  ngOnInit() {
    this.loadEventi()
  }

  loadEventi() {
    this.store.dispatch(EventiActions.loadEventi());
  }

  resetTable() {
    this.loadEventi();
    this.filterValue = "";
  }

  filterEventi() {
    this.store.dispatch(EventiActions.filterEventi({eventList: this.eventi(), filterValue: this.filterValue}))
  }

  sortBy(param: keyof Eventi) {
    this.store.dispatch(EventiActions.sortEventi({ test: param}))
  }

  openModalAddEvent(event: Partial<Eventi> ) {
    this.store.dispatch(ModalAddEventActions.openModal({event}));
  }

}
