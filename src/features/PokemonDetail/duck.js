import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import createDuck from '/ducks/fetchAndLoad';
import { getPokemonDetails } from '/endpoints';

const duck = createDuck('pokemonDetails', {
  data: { details: {}, species: {} }
});

export const {
  actions: {
    fetchData: fetchPokemonDetails,
    setData: setPokemonDetails
  },
  selectors,
  slice,
  reducer
} = duck;

export const fetchPokemonDetailsEpic = (action$, ...others) => action$.pipe(
  ofType(fetchPokemonDetails.type),
  switchMap((action) => {
    const epic = duck.makeFetchDataEpic({
      type: fetchPokemonDetails.type,
      endpoint: getPokemonDetails(action.payload),
      successActions: [setPokemonDetails]
    });

    return epic(of(action), ...others);
  })
);

export default reducer;
