import { shallow } from "enzyme";
import React from "react";
import NavBar from "./index";

const setup = props => shallow(<NavBar />);

describe("NavBar component test", () => {
  it("should represent navbar layout", () => {
    const component = setup();

    const links = component.find("NavLink");

    expect(component.find(".navbar")).toHaveLength(1);
    expect(links.at(0).text()).toBe("Home");
    expect(links.at(0).prop("to")).toBe("/");
    expect(links.at(1).text()).toBe("Settings");
    expect(links.at(1).prop("to")).toBe("/settings");
  });
});
