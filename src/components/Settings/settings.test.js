import React from "react";
import { shallow } from "enzyme";
import { NATIONALITIES } from "../../constats";
import { Settings } from "./index";

const changeValue = () => {};
const setup = props => shallow(<Settings changeValue={changeValue} {...props} />);

describe("Settings component test", () => {
  it("should represent nationality select", () => {
    const nationality = "FR";
    const component = setup({ nationality });
    const label = component.find("label");
    const select = component.find("select");
    const options = select.find("option");

    expect(label.text()).toBe("Nationality");
    expect(select.prop("value")).toBe(nationality);
    expect(options).toHaveLength(NATIONALITIES.length);

    options.forEach((option, i) => {
      expect(option.text()).toBe(NATIONALITIES[i].label);
      expect(option.prop("value")).toBe(NATIONALITIES[i].value);
    });
  });

  it("should handle nationality change", () => {
    const changeValue = jest.fn();
    const name = "nationality";
    const component = setup({ changeValue });
    const select = component.find("select");
    const options = select.find("option");

    options.forEach((_, i) => {
      const value = NATIONALITIES[i].value;
      const event = { target: { some: "option", name, value } };

      select.simulate("change", event);

      expect(changeValue).toHaveBeenCalledWith({
        name,
        value
      });
    });
  });
});
