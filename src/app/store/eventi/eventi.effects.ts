import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mergeMap, of} from 'rxjs';
import {Eventi} from '../../model/eventi';
import {EventiActions} from './eventi.actions';


export const eventiEffects =  createEffect((
  actions$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return actions$.pipe(
    ofType(EventiActions.loadEventi),
    mergeMap((actions) => http.get<Eventi[]>("http://localhost:3001/events")
    .pipe(
      map((items) => EventiActions.loadEventiSuccess({eventList: items})),
      catchError(() => of(EventiActions.loadEventiFail()))
      )
    )
  )
}, {functional: true})

export const addNewEvent = createEffect((
  action$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return action$.pipe(
    ofType(EventiActions.addEventi),
    mergeMap((action) => http.post<Eventi[]>("http://localhost:3001/events", action.event)
    .pipe(
      map((item) => EventiActions.addEventiSuccess({event: action.event})),
      catchError(() => of(EventiActions.addEventiFail()))
      )
    )
  )
}, {functional: true})


export const editEvent = createEffect((
  action$ = inject(Actions),
  http =  inject(HttpClient)
) => {
  return action$.pipe(
    ofType(EventiActions.editEventi),
    mergeMap((action) => http.patch<Eventi[]>(`http://localhost:3001/events/${action.event.id}`, action.event)
    .pipe(
      map((items) => EventiActions.editEventiSuccess({event: action.event})),
      catchError(() => of(EventiActions.editEventiFail()))
      )
    )
  )
}, {functional: true})

