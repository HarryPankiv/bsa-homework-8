import * as constants from "../constants";
import { combineReducers } from "redux";

const createList = filter => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case constants.FETCH_RECIPES_SUCCESS:
        return filter === action.filter ? action.response.result : state;
      case constants.ADD_RECIPE_SUCCESS:
        return filter === "all" ? [...state, action.response.result] : state;
      case constants.DELETE_RECIPE_SUCCESS:
        return state.filter(id => id !== action.id);
      case constants.TOGGLE_FAVORITE_SUCCESS: {
        const { result: toggledId, entities } = action.response;
        const { favorite } = entities.recipes[toggledId];
        const shouldRemove = !favorite && filter === "favorites";
        return shouldRemove ? state.filter(id => id !== toggledId) : state;
      }
      case constants.TOGGLE_COOKED_SUCCESS: {
        const { result: toggledId, entities } = action.response;
        const { cooked } = entities.recipes[toggledId];
        const shouldRemove = (cooked && filter === "uncooked") || (!cooked && filter === "cooked");
        return shouldRemove ? state.filter(id => id !== toggledId) : state;
      }
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case constants.FETCH_RECIPES_REQUEST:
        return true;
      case constants.FETCH_RECIPES_SUCCESS:
      case constants.FETCH_RECIPES_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case constants.FETCH_RECIPES_FAILURE:
        return action.message;
      case constants.FETCH_RECIPES_REQUEST:
      case constants.FETCH_RECIPES_SUCCESS:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;
export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
