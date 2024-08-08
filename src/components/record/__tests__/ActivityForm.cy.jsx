import ActivityForm from "../ActivityForm.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import sampleData from "../../../../database.sample.json";
import { expect } from "chai";

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
  it("location input works", () => {
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
              api={{
                getRoute: (start, end) => {
                  console.log("cy", start, end);
                  return new Promise((resolve) => {
                    if (start === "1" && end === "2")
                      return resolve({
                        data: { distance: 2000, duration: 600 },
                      });
                    return resolve({ error: "invalid route" });
                  });
                },
              }}
            />
          </AuthContext.Provider>
        </Router>
      );
    };
    cy.mount(<ActivityFormWrapper />);

    cy.get("button[name='startEnd']").click();

    cy.get("select[name='activityStart']").select("Home");
    cy.get("select[name='activityEnd']").select("Work - Watermark");

    cy.get("[data-cy='distance-chip']").should("have.text", "2.00 km");
    cy.get("[data-cy='duration-chip']").should("have.text", "10 mins");
    cy.get("[data-cy='gps-chip']").should("have.text", "No GPS");
    cy.get("button[name='save']").should("not.be.disabled");
    cy.get("button[name='save']").click();
    cy.wrap(handleSave)
      .should("have.been.calledOnce")
      .should("have.been.calledWith", {
        title: "Home to Work - Watermark",
        date: "2021-01-01",
        time: "08:00",
        distance: 2000,
        duration: 600,
        geoJson: null,
      });
  });

  it("GPX input works", () => {
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
              api={{
                getRoute: (start, end) => {
                  console.log("cy", start, end);
                  return new Promise((resolve) => {
                    if (start === "1" && end === "2")
                      return resolve({
                        data: { distance: 2000, duration: 600 },
                      });
                    return resolve({ error: "invalid route" });
                  });
                },
              }}
            />
          </AuthContext.Provider>
        </Router>
      );
    };
    cy.mount(<ActivityFormWrapper />);

    cy.get("button[name='dragDrop']").click();

    cy.get("input[id='dropzone-file']").selectFile("src/assets/Lunch_Run.gpx", {
      force: true,
    });

    cy.get("[data-cy='distance-chip']").should("have.text", "2.32 km");
    cy.get("[data-cy='duration-chip']").should("have.text", "16 mins");
    cy.get("[data-cy='gps-chip']").should("have.text", "GPS");
    cy.get("button[name='save']").should("not.be.disabled");
    cy.get("button[name='save']").click();
    cy.wrap(handleSave)
      .should("have.been.calledOnce")
      .should((spy) => {
        const activity = spy.getCall(0).args[0];

        const expected = {
          title: "Lunch Run",
          date: "2024-06-08",
          time: "11:52",
          distance: 2320,
          duration: 982,
        };

        expect(activity).to.include(expected);

        expect(activity.geoJson).to.be.an("object");
        expect(activity.geoJson.features).to.be.an("array");
        expect(activity.geoJson.features[0].geometry).to.be.an("object");
        expect(
          activity.geoJson.features[0].geometry.coordinates,
        ).to.have.lengthOf(221);
      });
  });
});
