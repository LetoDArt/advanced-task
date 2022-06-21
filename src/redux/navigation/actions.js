export const SET_CHOSEN_OPTION = 'SET_CHOSEN_OPTION';

export const navigationActions = {
  setChosenOption: (payload) => ({
    type: SET_CHOSEN_OPTION,
    payload,
  }),
};
