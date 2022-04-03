describe("app initilize", () => {
  before(() => {
    const elevatorResolved = [
      { id: "elv0", floor: 1, state: "stopped" },
      { id: "elv1", floor: 3, state: "stopped" },
      { id: "elv2", floor: 4, state: "stopped" },
    ];
    cy.intercept("/building", { elevators: 3, floors: 5 }).as("getBuilding");
    cy.intercept("/elevators", elevatorResolved);
    cy.visit("/");
  });
  it("building should render correct number of floors and elevators", () => {
    const building = cy.findByTestId("building");

    cy.wait("@getBuilding");
    const floor = building.get('[data-testId="floor"]');
    building.should("be.visible");
    floor.should("have.length", 5);

    const elevator = floor.get('[data-testId="elevator-present"]');
    elevator.should("have.length", 3);
  });
});

export const undef = undefined;
