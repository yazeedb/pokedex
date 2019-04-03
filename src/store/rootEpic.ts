import { combineEpics, Epic } from 'redux-observable';
import { fetchPokemonListEpic } from './PokemonPreviewList';
import { AnyAction } from 'redux';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { fetchPokemonDetailEpic } from './PokemonDetail';

export type AppEpic = Epic<AnyAction, any, any, { ajax: AjaxCreationMethod }>;
export const rootEpic = combineEpics(
  fetchPokemonListEpic,
  fetchPokemonDetailEpic
);
