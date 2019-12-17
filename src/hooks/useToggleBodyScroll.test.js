import React from "react";
import { mount } from "enzyme";
import useToggleBodyScrroll from "./useToggleBodyScrroll";

global.document.body.classList.add = jest.fn();
global.document.body.classList.remove = jest.fn();

describe("useToggleBodyScrroll", () => {
  beforeEach(() => {
    document.body.classList.add.mockRestore();
    document.body.classList.remove.mockRestore();
  });

  const Component = ({ isDisabled }) => {
    useToggleBodyScrroll(isDisabled);
    return <div />;
  };

  it("should add preventScroll class to body", () => {
    mount(<Component isDisabled />);

    expect(document.body.classList.add).toHaveBeenCalledWith("preventScroll");
  });

  it("should remove preventScroll class from body", () => {
    mount(<Component isDisabled={false} />);

    expect(document.body.classList.remove).toHaveBeenCalledWith("preventScroll");
  });
});
