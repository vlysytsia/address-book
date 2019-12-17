import React from "react";
import { shallow } from "enzyme";
import Message from "./index";

const setup = props => shallow(<Message {...props} />);

describe("Message component test", () => {
  const text = "Message";

  it("should represent default message type", () => {
    const component = setup({ text });

    expect(component.find(".message")).toHaveLength(1);
    expect(component.find(".message").text()).toBe(text);
  });

  it("should represent error message type", () => {
    const type = "error";
    const component = setup({ text, type });

    expect(component.find(".message").hasClass(type)).toBeTruthy();
    expect(component.find(".message").text()).toBe(text);
  });
});
