import React, { useState } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { primary } from "../components/Button.stories";

afterEach(cleanup);

describe("onClick interactivity", () => {
  it("should fire onClick event", () => {
    const clicked = "Clicked!";
    function WrappedButton({ disabled }) {
      const [children, setChildren] = useState("Primary Button");
      const onClick = () => setChildren(clicked);
      return primary({
        children,
        onClick,
        disabled
      });
    }

    const comp = render(<WrappedButton />);
    fireEvent.click(comp.getByText("Primary Button"));
    expect(comp.getByText(clicked)).toBeTruthy();
  });

  it("should do nothing when disabled", () => {
    const initialState = "Primary Button";
    const clickedState = "Clicked!";
    function WrappedButton({ disabled }) {
      const [children, setChildren] = useState(initialState);
      const onClick = () => setChildren(clickedState);
      return primary({
        children,
        onClick,
        disabled
      });
    }

    const comp = render(<WrappedButton disabled />);
    fireEvent.click(comp.getByText("Primary Button"));
    expect(comp.getByText(initialState)).toBeTruthy();
  });
});

describe("accessability", () => {
  it("should be focussable", () => {
    const { getByTestId } = render(primary());
    const id = "primary-button";
    getByTestId(id).focus();
    expect(getByTestId(id)).toHaveFocus();
  });
});

describe("renders", () => {
  it("as anchor element", () => {
    const element = "a";
    const { container } = render(primary({ as: element }));
    const anchorEl = container.querySelector(element);
    expect(anchorEl).toBeInTheDocument();
  });
});
