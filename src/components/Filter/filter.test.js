import React from "react";
import { shallow } from "enzyme";
import { Filter } from "./index";

const setup = props => shallow(<Filter onChange={() => {}} {...props} />);

describe("Filter component test", () => {
  it("should represent filter input", () => {
    const component = setup();

    expect(component.find("input")).toHaveLength(1);
    expect(component.find(".focusBorder")).toHaveLength(1);
  });

  it("should represent correct value ", () => {
    const value = "value";
    const component = setup({ value });

    expect(component.find("input").prop("value")).toBe(value);
  });

  it("should handle input change", () => {
    const value = "value";
    const onChange = jest.fn();
    const component = setup({ value, onChange });

    component.find("input").simulate("change", { target: { value } });

    expect(onChange).toHaveBeenCalledWith(value);
  });
});
