import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
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

  it("renders form with default values", () => {
    const { getByLabelText, getByText } = render(
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
    expect(getByLabelText("Title").value).toBe("Commute to Work");
    expect(getByLabelText("Date").value).toBe("2024-01-01");
    expect(getByLabelText("Time").value).toBe("08:00");
    expect(getByLabelText("Start Location").value).toBe("none");
    expect(getByLabelText("End Location").value).toBe("none");
    expect(getByLabelText("Distance (m)").value).toBe("");
    expect(getByLabelText("Duration (s)").value).toBe("");
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Add")).toBeInTheDocument();
  });

  it("should disable the distance/duration when locations are set", () => {
    const setFormData = vi.fn();
    const { getByLabelText } = render(
      <Router>
        <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
          <ActivityForm
            handleSave={() => null}
            locations={sampleData.locations}
            formData={sampleFormData}
            setFormData={setFormData}
          />
        </AuthContext.Provider>
      </Router>,
    );
    expect(getByLabelText("Distance (m)")).not.toBeDisabled();
    expect(getByLabelText("Duration (s)")).not.toBeDisabled();
    fireEvent.change(getByLabelText("Start Location"), {
      target: { value: "1" },
    });
    expect(setFormData).toHaveBeenCalledWith({
      ...sampleFormData,
      start: "1",
    });
  });
  it("should disable the distance/duration when start set", () => {
    const setFormData = vi.fn();
    const { getByLabelText } = render(
      <Router>
        <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
          <ActivityForm
            handleSave={() => null}
            locations={sampleData.locations}
            formData={{ ...sampleFormData, start: "1" }}
            setFormData={setFormData}
          />
        </AuthContext.Provider>
      </Router>,
    );
    expect(getByLabelText("Distance (m)")).toBeDisabled();
    expect(getByLabelText("Duration (s)")).toBeDisabled();
  });
  it("should disable the distance/duration when end set", () => {
    const setFormData = vi.fn();
    const { getByLabelText } = render(
      <Router>
        <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
          <ActivityForm
            handleSave={() => null}
            locations={sampleData.locations}
            formData={{ ...sampleFormData, end: "1" }}
            setFormData={setFormData}
          />
        </AuthContext.Provider>
      </Router>,
    );
    expect(getByLabelText("Distance (m)")).toBeDisabled();
    expect(getByLabelText("Duration (s)")).toBeDisabled();
  });
});
