import * as constants from "../constants";

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.recipes
    };
  }
  if (action.type === constants.DELETE_RECIPE_SUCCESS) {
    const nextState = { ...state };
    delete nextState[action.id];
    return nextState;
  }
  return state;
};

export default byId;
export const getRecipe = (state, id) => state[id];
