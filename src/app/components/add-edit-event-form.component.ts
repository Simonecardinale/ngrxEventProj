import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {selectEvent, selectIsEditing, selectIsOpened} from '../store/modalAddEvent/modalAddEvent.features';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Button} from 'primeng/button';
import {ModalAddEventActions} from '../store/modalAddEvent/modalAddEvent.actions';
import {EventiActions} from '../store/eventi/eventi.actions';
import {Store} from '@ngrx/store';
import {selectEventi} from '../store/eventi/eventi.features';
import {Eventi} from '../model/eventi';

@Component({
  selector: 'app-add-edit-event-form',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    DatePicker,
    Button
  ],
  template: `
    <form [formGroup]="form" class="gap-y-6 flex flex-col">
      <!--id-->
      <p-floatlabel>
        <input type="number" pInputText id="over_label" formControlName="id" autocomplete="off"/>
        <label for="over_label">Id</label>
      </p-floatlabel>

      <!--title-->
      <p-floatlabel>
        <input type="text" pInputText id="over_label" formControlName="title" autocomplete="off"/>
        <label for="over_label">Title</label>
      </p-floatlabel>

      <!--date-->
      <p-floatlabel>
        <input [min]="today" type="date" pInputText id="over_label" formControlName="date" autocomplete="off"/>
      </p-floatlabel>


      <!--location-->
      <p-floatlabel>
        <input type="text" pInputText id="over_label" formControlName="location" autocomplete="off"/>
        <label for="over_label">Location</label>
      </p-floatlabel>

      <!--total seats-->
      <p-floatlabel>
        <input type="number" pInputText id="over_label" formControlName="totalSeats" autocomplete="off"/>
        <label for="over_label">Total seats</label>
      </p-floatlabel>

      <!--available seats-->
      <p-floatlabel>
        <input type="number" pInputText id="over_label" formControlName="availableSeats" autocomplete="off"/>
        <label for="over_label">Available seats</label>
      </p-floatlabel>

      <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (click)="closeModal()" />
        <p-button label="Save" (click)="addEditEvent()" />
      </div>
    </form>
  `,
  styles: ``
})
export class AddEditEventFormComponent implements OnInit {

  store = inject(Store);
  fb = inject(FormBuilder);
  today: string = new Date().toISOString().split('T')[0];
  isEditing = this.store.selectSignal(selectIsEditing);
  event = this.store.selectSignal(selectEvent)

  ngOnInit() {
    const newForm = this.event();
    if(newForm) {
      this.form.patchValue({
        id: newForm.id,
        title: newForm.title,
        date: newForm.date,
        location: newForm.location,
        totalSeats: newForm.totalSeats,
        availableSeats: newForm.availableSeats
      })
    }
  }

  form = this.fb.nonNullable.group({
    id: [null as number | null, [Validators.required]],
    title: [null as string | null, [Validators.required]],
    date: [null as Date | null, [Validators.required]],
    location: [null as string | null, [Validators.required]],
    totalSeats: [null as number | null, [Validators.required]],
    availableSeats: [null as number | null, [Validators.required]],
  })


  closeModal() {
    this.store.dispatch(ModalAddEventActions.closeModal());
  }

  addEditEvent() {
    if(this.form.valid) {
      if(this.isEditing()) {
        this.store.dispatch(EventiActions.editEventi({event: this.form.getRawValue()}))
      } else  {
        this.store.dispatch(EventiActions.addEventi({event: this.form.getRawValue()}))
      }
      this.closeModal();
    }
  }
}
