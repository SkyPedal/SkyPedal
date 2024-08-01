import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ActivityForm from "../components/record/ActivityForm";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import sampleData from "../../database.sample";

const sampleFormData = {
  title: "Commute to Work",
  date: "2024-01-01",
  time: "08:00",
  start: "none",
  end: "none",
  distance: 0,
  duration: 0,
};

describe("ActivityForm", () => {
  it("snapshot renders", () => {
    const { asFragment } = render(
      <Router>
        <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
          <ActivityForm
            handleSave={() => null}
            locations={sampleData.locations}
            formData={sampleFormData}
            setFormData={() => null}
          />
        </AuthContext.Provider>
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
