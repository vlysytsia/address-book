import React from "react";
import { shallow } from "enzyme";
import Loading from "./index";

const setup = () => shallow(<Loading />);

describe("Loading component test", () => {
  it("should represent loader", () => {
    const component = setup({ isVisible: true });

    expect(component.find(".loading")).toHaveLength(1);
    expect(component.find(".loading").text()).toBe("LOADING...");
  });
});
