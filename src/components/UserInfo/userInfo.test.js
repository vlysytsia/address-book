import React from "react";
import { shallow } from "enzyme";
import UserInfo from "./index";
import { users } from "../../mocks/users";

const [user] = users;
const setup = props => shallow(<UserInfo onDetailsClick={() => {}} {...user} {...props} />);

describe("UserInfo component test", () => {
  it("should represent user info layout", () => {
    const component = setup();
    const { name, picture, email } = user;

    expect(component.find(".thumbnail").prop("src")).toBe(picture.thumbnail);
    expect(component.find("h3.name").text()).toBe(`${name.first} ${name.last}`);
    expect(component.find("a.email").text()).toBe(email);
    expect(component.find("a.email").prop("href")).toBe(`mailto:${email}`);
    expect(component.find("button.detailsBtn").text()).toBe("Details");
  });

  it("should handle details button click", () => {
    const onDetailsClick = jest.fn();
    const component = setup({ onDetailsClick });

    const detailsBtn = component.find("button.detailsBtn");

    detailsBtn.simulate("click");
    expect(onDetailsClick).toHaveBeenCalledTimes(1);
  });
});
