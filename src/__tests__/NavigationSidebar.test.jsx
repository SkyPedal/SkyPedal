import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavigationSidebar from "../components/NavigationSidebar";
import { BrowserRouter as Router } from "react-router-dom";

describe("NavigationSidebar", () => {
  it("snapshot renders", () => {
    const { asFragment } = render(
      <Router>
        <NavigationSidebar />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
