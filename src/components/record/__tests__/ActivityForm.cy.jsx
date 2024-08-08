import React from "react";
import ActivityForm from "../ActivityForm.jsx";
import useFormData from "../FormData";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import sampleData from "../../../../database.sample.json";

describe("<ActivityForm />", () => {
  beforeEach(() => {
    cy.clock(new Date("2021-01-01"));
  });

  it("renders with default values", () => {
    const ActivityFormWrapper = () => {
      const locations = sampleData.locations;
      return (
        <Router>
          <AuthContext.Provider
            value={{ user_id: 1, user_name: "TestUser123" }}
          >
            <ActivityForm locations={locations} handleSave={() => null} />
          </AuthContext.Provider>
        </Router>
      );
    };
    cy.mount(<ActivityFormWrapper />);
    cy.get("input[name='activityName']").should(
      "have.value",
      "Commute to Work",
    );
    cy.get("input[name='activityDate']").should("have.value", "2021-01-01");
    cy.get("input[name='activityTime']").should("have.value", "08:00");
    cy.get("[data-cy='distance-chip']").should("have.text", "0.00 km");
    cy.get("[data-cy='duration-chip']").should("have.text", "0 mins");
    cy.get("[data-cy='gps-chip']").should("have.text", "No GPS");
    cy.get("button[name='clear']").should("have.text", "Clear");
    cy.get("button[name='save']")
      .should("have.text", "Add")
      .should("be.disabled");
  });

  it("manual input works", () => {
    const handleSave = cy.spy();
    const ActivityFormWrapper = () => {
      const locations = sampleData.locations;
      return (
        <Router>
          <AuthContext.Provider
            value={{ user_id: 1, user_name: "TestUser123" }}
          >
            <ActivityForm
              locations={locations}
              handleSave={handleSave}
              setError={() => null}
              api={() => null}
            />
          </AuthContext.Provider>
        </Router>
      );
    };
    cy.mount(<ActivityFormWrapper />);

    cy.get("button[name='distanceDuration']").click();

    cy.get("input[name='activityDistance']").type("1");
    cy.get("input[name='activityDuration']").type("60");

    cy.get("[data-cy='distance-chip']").should("have.text", "1.00 km");
    cy.get("[data-cy='duration-chip']").should("have.text", "60 mins");
    cy.get("[data-cy='gps-chip']").should("have.text", "No GPS");
    cy.get("button[name='save']").should("not.be.disabled");
    cy.get("button[name='save']").click();
    cy.wrap(handleSave)
      .should("have.been.calledOnce")
      .should("have.been.calledWith", {
        title: "Commute to Work",
        date: "2021-01-01",
        time: "08:00",
        distance: 1000,
        duration: 3600,
        geoJson: null,
      });
  });
});
