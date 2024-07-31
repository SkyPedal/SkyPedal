import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecordActivity from "../components/RecordActivity";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../context/AuthContext";

describe("RecordActivity", () => {
  it("snapshot renders", () => {
    const { asFragment } = render(
      <Router>
        <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
          <RecordActivity />
        </AuthContext.Provider>
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
