import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {Eventi} from '../../model/eventi';
import {EventiActions} from './eventi.actions';
import {state} from '@angular/animations';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

export interface EventiState {
  eventi: Eventi[];
  originalEvents: Eventi[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: EventiState = {
  eventi: [],
  originalEvents: [],
  isLoading: false,
  hasError: false,
};


export const eventiFeatures =  createFeature({
  name: "Eventi",
  reducer: createReducer(
    initialState,
    on(EventiActions.loadEventi, (state, action): EventiState => ({...state, isLoading: true})),
    on(EventiActions.loadEventiSuccess, (state, action): EventiState => ({...state, isLoading: false, hasError: false, eventi: action.eventList, originalEvents: action.eventList})),
    on(EventiActions.loadEventiFail, (state): EventiState => ({...state, isLoading: false, hasError: true})),
    on(EventiActions.filterEventi, (state, action): EventiState => ({...state, isLoading: false, hasError: false, eventi: state.originalEvents.slice().filter(el => {
      // Filtra gli eventi in base al valore di filterValue
        return Object.values(el).some(elem =>
          // typeof elem === 'string' || typeof elem === 'number' &&
          elem.toString().toLowerCase().includes(action.filterValue.toLowerCase())
        );
      })

    })),
    on(EventiActions.sortEventi, (state, action): EventiState => ({
      ...state,
      eventi: state.eventi.slice().sort((a, b) => -1),
    })),
    on(EventiActions.addEventi, (state, action): EventiState => ({...state, isLoading: true, hasError: false})),
    on(EventiActions.addEventiSuccess, (state, action): EventiState => ({...state, eventi: [...state.eventi, action.event]})),
    on(EventiActions.addEventiFail, (state) => ({...state, isLoading: false, hasError: true})),
    on(EventiActions.editEventi, (state, action): EventiState => ({...state, isLoading: true, hasError: false})),
    on(EventiActions.editEventiSuccess, (state, action): EventiState => ({...state, isLoading: false, hasError: false, eventi: state.eventi.map(el => el.id === action.event.id ? action.event : el)})),
    on(EventiActions.editEventiFail, (state): EventiState => ({...state, isLoading: false, hasError: true}))
  ),
});

export const {
  selectEventi,
  selectHasError,
  selectIsLoading
} = eventiFeatures
