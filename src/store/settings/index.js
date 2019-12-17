import { NATIONALITIES } from "../../constats";
import { createAction } from "../../helpers";

// action types
export const CHANGE_SETTINGS_VALUE = "CHANGE_SETTINGS_VALUE";
// action creators
export const changeSettingsValue = createAction(CHANGE_SETTINGS_VALUE);

export const initialState = {
  nationality: NATIONALITIES[0].value
};
// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SETTINGS_VALUE:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value
      };
    default:
      return state;
  }
};

// selectors
export const selectNationality = state => state.settings.nationality;

export default reducer;
