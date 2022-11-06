import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";

import { light, dark } from "../ui/Buttons.stories";

afterEach(cleanup);

describe("renders theme", () => {
  it("light", () => {
    const comp = render(light());
    expect(comp).toMatchSnapshot();
  });
  it("dark", () => {
    const comp = render(dark());
    expect(comp).toMatchSnapshot();
  });
});
