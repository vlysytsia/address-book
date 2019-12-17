import React from "react";
import { mount } from "enzyme";
import useEscPress from "./useEscPress";
import { addEventListenerMock, removeEventListenerMock } from "../helpers";

describe("useEscPress", () => {
  afterEach(() => {
    document.addEventListener.mockRestore();
    document.removeEventListener.mockRestore();
  });

  const callback = jest.fn();

  const Component = () => {
    useEscPress(callback);
    return <div />;
  };

  it("should add event listener for Escape keydown", () => {
    const map = addEventListenerMock();
    removeEventListenerMock();
    mount(<Component />);

    map.keydown({ key: "Enter" });

    expect(callback).not.toHaveBeenCalled();

    map.keydown({ key: "Escape" });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
  });

  it("should remove event listener for keydown on unmount", () => {
    addEventListenerMock();
    removeEventListenerMock();

    const wrapper = mount(<Component />);

    wrapper.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
