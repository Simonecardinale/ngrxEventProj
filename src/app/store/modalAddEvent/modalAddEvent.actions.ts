import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Eventi} from '../../model/eventi';


export const ModalAddEventActions = createActionGroup({
  source: 'ModalAddEventActions',
  events: {
    "Open Modal": props<{event: Partial<Eventi>}>(),
    "Close Modal": emptyProps(),
  }
})
