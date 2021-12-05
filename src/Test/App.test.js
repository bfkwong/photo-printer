import { render } from "@testing-library/react";
import { Banned, GoodStanding, Probation } from "../Components/Common/Badges";
import { getAllOrders, getAllUsers, getCogUsername, getCompletedFTU, getUserInfo, getUserType } from "../redux";

describe("redux", () => {
  test("selectors", () => {
    const state = {};

    expect(getUserType(state)).toBe(undefined);
    state.userType = "userType";
    expect(getUserType(state)).toBe("userType");

    expect(getCogUsername(state)).toBe(undefined);
    state.cogUsername = "cogUsername";
    expect(getCogUsername(state)).toBe("cogUsername");

    expect(getAllOrders(state)).toBe(undefined);
    state.allOrders = "allOrders";
    expect(getAllOrders(state)).toBe("allOrders");

    expect(getCompletedFTU(state)).toBe(undefined);
    state.completedFTU = "completedFTU";
    expect(getCompletedFTU(state)).toBe("completedFTU");

    expect(getUserInfo(state)).toBe(undefined);
    state.userInfo = "userInfo";
    expect(getUserInfo(state)).toBe("userInfo");

    state.allUsers = "allUsers";
    expect(getAllUsers(state)).toBe("allUsers");
  });
});

describe("components", () => {
  describe("common", () => {
    test("Badges", () => {
      const goodStanding = render(<GoodStanding />);
      expect(goodStanding).toMatchSnapshot();

      const probation = render(<Probation />);
      expect(probation).toMatchSnapshot();

      const banned = render(<Banned />);
      expect(banned).toMatchSnapshot();
    });
  });
});
