import * as constants from "../constants";

const mask = (state = "", action) => {
  switch (action.type) {
    case constants.SET_FILTER_MASK_SUCCESS:
      return action.mask;
    default:
      return state;
  }
};

export default mask;
