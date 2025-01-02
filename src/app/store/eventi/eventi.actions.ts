import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Eventi} from '../../model/eventi';


export const EventiActions =  createActionGroup({
  source: "Eventi",
  events: {
    "Load Eventi": emptyProps(),
    "Load Eventi Success": props<{eventList: Eventi[]}>(),
    "Load Eventi Fail": emptyProps(),
    "Filter Eventi": props<{eventList: Eventi[], filterValue: string}>(),
    "Sort Eventi": props<{test: keyof Eventi}>(),
    "Add Eventi":  props<{event: Eventi}>(),
    "Add Eventi Success": props<{event: Eventi}>(),
    "Add Eventi Fail": emptyProps(),
    "Edit Eventi": props<{event: Eventi}>(),
    "Edit Eventi Success": props<{event: Eventi}>(),
    "Edit Eventi Fail": emptyProps(),
  }
})


