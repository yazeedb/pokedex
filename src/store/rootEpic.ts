import { combineEpics, Epic } from 'redux-observable';
import { fetchPokemonListEpic } from './PokemonPreviewList/epics';
import { AnyAction } from 'redux';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';

export type AppEpic = Epic<AnyAction, any, any, { ajax: AjaxCreationMethod }>;
export const rootEpic = combineEpics(fetchPokemonListEpic);
