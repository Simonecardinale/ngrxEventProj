import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {Store} from '@ngrx/store';
import {selectIsOpened} from '../store/modalAddEvent/modalAddEvent.features';
import {ModalAddEventActions} from '../store/modalAddEvent/modalAddEvent.actions';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, Validators} from '@angular/forms';
import {AddEditEventFormComponent} from './add-edit-event-form.component';
import {EventiActions} from '../store/eventi/eventi.actions';

@Component({
  selector: 'app-modal-add-event',
  imports: [
    Dialog,
    Button,
    InputText,
    AddEditEventFormComponent
  ],
  template: `
    @if (visible()) {
      <p-dialog header="Add event" [closable]="false" [visible]="true" [modal]="true" [style]="{ width: '25rem' }">
        <span class="p-text-secondary block mb-8">Add a new event.</span>
        <div class="my-3">
          <app-add-edit-event-form/>
        </div>
      </p-dialog>

    }
  `,
  styles: ``
})
export class ModalAddEventComponent {

  store = inject(Store);
  visible = this.store.selectSignal(selectIsOpened);


}
