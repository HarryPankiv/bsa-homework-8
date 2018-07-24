import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
import mask from './mask';

const listByFilter = combineReducers({
  all: createList('all'),
  favorites: createList('favorites'),
  cooked: createList('cooked'),
  uncooked: createList('uncooked'),
  untagged: createList('untagged')
});

const recipes = combineReducers({
  byId,
  listByFilter,
  mask,
  routing: routerReducer
});

export default recipes;

export const getVisibleRecipes = (state, filter) => {
  return fromList
    .getIds(state.listByFilter[filter])
    .map(id => fromById.getRecipe(state.byId, id))
    .filter(
      r =>
        state.mask.startsWith('#')
          ? r.tags.indexOf(state.mask.replace('#', '')) !== -1
          : r.title.includes(state.mask)
    )
    .sort((a, b) => a.timestamp - b.timestamp)
    .reverse();
};

export const getRecipe = (state, id) => {
  return fromById.getRecipe(state.byId, id);
};

export const getIsFetching = (state, filter) => {
  return fromList.getIsFetching(state.listByFilter[filter]);
};

export const getErrorMessage = (state, filter) => {
  return fromList.getErrorMessage(state.listByFilter[filter]);
};
