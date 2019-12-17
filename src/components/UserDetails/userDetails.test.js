import React from "react";
import { shallow } from "enzyme";
import { users } from "../../mocks/users";
import UserDetails from "./index";

const [user] = users;
const setup = () => shallow(<UserDetails {...user} />);

describe("UserDetails component test", () => {
  it("should represent user details layout", () => {
    const component = setup();
    const { name, location, cell } = user;

    expect(component.find("h3").text()).toBe(`${name.first} ${name.last}`);
    expect(component.find(".city").text()).toBe(`City: ${location.city}`);
    expect(component.find(".street").text()).toBe(`Street: ${location.street.name}, ${location.street.number}`);
    expect(component.find(".postcode").text()).toBe(`Postcode: ${location.postcode}`);
    expect(component.find(".cell").text()).toBe(`Cell: ${cell}`);
    expect(component.find(".cell a").prop("href")).toBe(`tel:${cell}`);
  });
});
