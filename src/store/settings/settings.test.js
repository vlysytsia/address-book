import { combineReducers } from "redux";
import { testReducer } from "../../helpers";
import settings, { changeSettingsValue, selectNationality } from "./index";

const reducer = combineReducers({ settings });

describe("settings reducer", () => {
  const name = "nationality";
  const value = "FR";

  it("should handle settings change", () => {
    testReducer(reducer)
      .expect(selectNationality, "CH")
      .put(changeSettingsValue({ name, value }))
      .expect(selectNationality, value);
  });
});
