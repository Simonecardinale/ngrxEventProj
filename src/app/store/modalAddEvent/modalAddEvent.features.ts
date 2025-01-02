import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {ModalAddEventActions} from './modalAddEvent.actions';
import {Eventi} from '../../model/eventi';

export interface ModalState {
  isOpened: boolean;
  isEditing: boolean;
  event: Partial<Eventi>
}

const initialState: ModalState = {
  isOpened: false,
  isEditing: false,
  event: {}
}


export const modalAddEventFeatures = createFeature({
  name: "ModalAddEvent",
  reducer: createReducer(
    initialState,
    on(ModalAddEventActions.openModal, (state, action): ModalState => ({...state, event: action.event, isOpened: true, isEditing: !!action.event.id})),
    on(ModalAddEventActions.closeModal, (state): ModalState => ({...state, isOpened: false})),
  ),
})


export const {
  selectIsOpened,
  selectIsEditing,
  selectEvent
} = modalAddEventFeatures
