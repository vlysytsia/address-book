import React from "react";
import { shallow, mount } from "enzyme";
import { Home } from "./index";
import { users } from "../../mocks/users";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducers } from "../../store";
const setup = props => shallow(<Home users={users} {...props} />);

describe("Home component test", () => {
  it("should represent title components", () => {
    const component = setup();

    expect(component.find("h1").text()).toBe("Address book app");
  });

  it("should represent filter", () => {
    const component = setup();

    expect(component.find("Connect(Filter)")).toHaveLength(1);
  });

  it("should represent users grid", () => {
    const component = setup();

    expect(component.find(".grid")).toHaveLength(1);
    expect(component.find("UserInfo")).toHaveLength(users.length);
  });

  it("should represent Loader", () => {
    const component = setup();

    expect(component.find("Loader")).toHaveLength(0);

    component.setProps({ loading: true });

    expect(component.find("Loader")).toHaveLength(1);
  });

  it("should represent no results message", () => {
    const component = setup();

    expect(component.find('Message[data-test="no-results"]')).toHaveLength(0);

    component.setProps({ showNoResults: true });

    expect(component.find('Message[data-test="no-results"]')).toHaveLength(1);
  });

  it("should represent end catalog message", () => {
    const component = setup({ isLoadingAvailable: true });

    expect(component.find('Message[data-test="end-catalog"]')).toHaveLength(0);

    component.setProps({ isLoadingAvailable: false });

    expect(component.find('Message[data-test="end-catalog"]')).toHaveLength(1);
  });

  it("should represent error message", () => {
    const component = setup();

    expect(component.find('Message[data-test="error"]')).toHaveLength(0);

    component.setProps({ showError: true });

    expect(component.find('Message[data-test="error"]')).toHaveLength(1);
  });

  it("should represent user detail suspense modal", () => {
    const component = setup();

    expect(component.find("Suspense")).toHaveLength(1);
    expect(component.find("UserDetails")).toHaveLength(1);
  });

  it("should load users on init render", () => {
    const loadUsers = jest.fn();
    const store = createStore(rootReducers);
    mount(
      <Provider store={store}>
        <Home loadUsers={loadUsers} />
      </Provider>
    );

    expect(loadUsers).toHaveBeenCalledTimes(1);
  });
});
