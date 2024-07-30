import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoSidebar from "../components/InfoSidebar";
import { BrowserRouter as Router } from "react-router-dom";

describe("InfoSidebar", () => {
  it("snapshot renders", () => {
    const { asFragment } = render(
      <Router>
        <InfoSidebar />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
