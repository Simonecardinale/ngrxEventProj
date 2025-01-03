import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {selectEventi} from '../../store/eventi/eventi.features';
import {EventiActions} from '../../store/eventi/eventi.actions';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Eventi} from '../../model/eventi';

@Component({
  selector: 'app-prenotazioni',
  imports: [ReactiveFormsModule, Select, InputText, Button],
  template: `
    @defer (when events()) {
      <div class="container mx-auto py-5">
        <h1 class="text-center text-2xl">Prenota qui il tuo posto</h1>

        <form [formGroup]=form class="flex flex-col items-center gap-y-4 mt-3">
          <p-select formControlName="evento" [options]="events()!" optionLabel="title" placeholder="Seleziona un evento" class="w-full md:w-56" />

          <div class="flex flex-col ">
            <small>Inserisci il numero di posti</small>
            <input type="number" pInputText id="seats" aria-describedby="seats" formControlName="seats" />
          </div>

          <p-button (click)="reserveSeats()" label="Save" />


        </form>

      </div>
    }

  `,
  styles: ``
})
export default class PrenotazioniComponent implements OnInit {

  store = inject(Store);
  fb = inject(FormBuilder);
  events = this.store.selectSignal(selectEventi)

  ngOnInit() {
    if (!this.events().length) {
      this.store.dispatch(EventiActions.loadEventi());
    }
  }

  form = this.fb.nonNullable.group({
    evento: [{} as Eventi, Validators.required],
    seats: ['', Validators.required],
  })

  reserveSeats() {
    if(this.form.valid) {
      const event = this.form.get("evento")?.value;

      if(event && event.availableSeats! > parseInt(this.form.get("seats")!.value)) {
        const editedForm = {
          id: event.id,
          title: event.title,
          availableSeats: event.availableSeats! - parseInt(this.form.get("seats")!.value),
        }
        this.store.dispatch(EventiActions.editEventi({event: editedForm}))
      }
    }

  }

}
