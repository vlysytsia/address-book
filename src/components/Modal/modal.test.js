import React from "react";
import { shallow, mount } from "enzyme";
import Modal from "./index";
import useToggleBodyScrroll from "../../hooks/useToggleBodyScrroll";
import useEscPress from "../../hooks/useEscPress";

jest.mock("../../hooks/useToggleBodyScrroll", () => jest.fn());
jest.mock("../../hooks/useEscPress", () => jest.fn());

const children = "children";

const setup = props =>
  shallow(
    <Modal onClose={() => {}} {...props}>
      {children}
    </Modal>
  );

describe("Modal component test", () => {
  beforeEach(() => {
    useToggleBodyScrroll.mockRestore();
    useEscPress.mockRestore();
  });

  it("should represent close state by default", () => {
    const component = setup();

    expect(component.find(".overlay")).toHaveLength(1);
    expect(component.find(".overlay").hasClass("open")).toBeFalsy();
    expect(component.find(".modal")).toHaveLength(1);
    expect(component.find(".content")).toHaveLength(0);
  });

  it("should represent open state", () => {
    const component = setup({ isOpen: true });

    expect(component.find(".overlay").hasClass("open")).toBeTruthy();
    expect(component.find(".content")).toHaveLength(1);
    expect(component.find(".closeBtn")).toHaveLength(1);
    expect(component.find(".content").text()).toBe(children);
  });

  it("should handle close button click", () => {
    const onClose = jest.fn();
    const component = setup({ isOpen: true, onClose });

    component.find(".closeBtn").simulate("click");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should run effects on render", () => {
    const onClose = jest.fn();
    const isOpen = true;
    mount(
      <Modal onClose={onClose} isOpen={isOpen}>
        {children}
      </Modal>
    );

    expect(useToggleBodyScrroll).toHaveBeenCalledWith(isOpen);
    expect(useEscPress).toHaveBeenCalledWith(onClose);
  });
});
