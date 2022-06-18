import { SET_CHOSEN_OPTION } from './actions';


const initialState = {
  chosenOption: '',
};

export const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHOSEN_OPTION:
      return {
        ...state,
        chosenOption: action.payload,
      };
    default:
      return state;
  }
};
