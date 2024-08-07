import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import useFormData from "../components/record/FormData";
// import { Router } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ActivityForm from "../components/record/ActivityForm";
import { BrowserRouter as Router } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
import sampleData from "../../database.sample";
// import useFormData from "../components/record/FormData";

// vi.mock("../utils/today", () => ({
//   default: () => "2021-01-01",
// }));

describe("ActivityForm", () => {
  // it("snapshot renders", () => {
  //   const { asFragment } = render(
  //     <Router>
  //       <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
  //         <ActivityForm
  //           handleSave={() => null}
  //           locations={sampleData.locations}
  //           formData={sampleFormData}
  //           setFormData={() => null}
  //         />
  //       </AuthContext.Provider>
  //     </Router>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  it("renders form with default values", async () => {
    // render(<p> 0.00 km </p>);
    const { result } = renderHook(useFormData);
    render(
      <>
        <p> 0.00 km </p>
        <Router>
          <AuthContext.Provider
            value={{ user_id: 1, user_name: "TestUser123" }}
          >
            <ActivityForm
              handleSave={() => null}
              locations={sampleData.locations}
              formData={result.current}
            />
          </AuthContext.Provider>
        </Router>
      </>,
    );
    screen.debug();
    await waitFor(() => screen.getByText(/km/i));
    // setTimeout(() => screen.getByRole("paragraph", { hidden: true }), 1000);

    // expect(getByLabelText("Title").value).toBe("Commute to Work");
    // expect(getByLabelText("Date").value).toBe("2021-01-01");
    // expect(getByLabelText("Time").value).toBe("08:00");
    // const dist = screen.getByTestId("distance-text");
    // expect(dist).toBeInTheDocument();
    // expect(dist.textContent).toBe("0.00 km");
    // expect(screen.getByText(/0\.00\s*km/).toBeInTheDocument());
    // expect(getByLabelText("0 mins")).toBeInTheDocument();
    // expect(getByText("Clear")).toBeInTheDocument();
    // expect(getByText("Add")).toBeInTheDocument();
  });

  // it("should disable the distance/duration when locations are set", () => {
  //   const formData = useFormData();
  //   const setFormData = vi.fn();
  //   const { getByLabelText } = render(
  //     <Router>
  //       <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
  //         <ActivityForm
  //           handleSave={() => null}
  //           locations={sampleData.locations}
  //           formData={formData}
  //         />
  //       </AuthContext.Provider>
  //     </Router>,
  //   );
  //   expect(getByLabelText("Distance (m)")).not.toBeDisabled();
  //   expect(getByLabelText("Duration (s)")).not.toBeDisabled();
  //   fireEvent.change(getByLabelText("Start Location"), {
  //     target: { value: "1" },
  //   });
  //   expect(setFormData).toHaveBeenCalledWith({
  //     ...sampleFormData,
  //     start: "1",
  //   });
  // });
  // it("should disable the distance/duration when start set", () => {
  //   const setFormData = vi.fn();
  //   const { getByLabelText } = render(
  //     <Router>
  //       <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
  //         <ActivityForm
  //           handleSave={() => null}
  //           locations={sampleData.locations}
  //           formData={{ ...sampleFormData, start: "1" }}
  //           setFormData={setFormData}
  //         />
  //       </AuthContext.Provider>
  //     </Router>,
  //   );
  //   expect(getByLabelText("Distance (m)")).toBeDisabled();
  //   expect(getByLabelText("Duration (s)")).toBeDisabled();
  // });
  // it("should disable the distance/duration when end set", () => {
  //   const setFormData = vi.fn();
  //   const { getByLabelText } = render(
  //     <Router>
  //       <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
  //         <ActivityForm
  //           handleSave={() => null}
  //           locations={sampleData.locations}
  //           formData={{ ...sampleFormData, end: "1" }}
  //           setFormData={setFormData}
  //         />
  //       </AuthContext.Provider>
  //     </Router>,
  //   );
  //   expect(getByLabelText("Distance (m)")).toBeDisabled();
  //   expect(getByLabelText("Duration (s)")).toBeDisabled();
  // });
});
