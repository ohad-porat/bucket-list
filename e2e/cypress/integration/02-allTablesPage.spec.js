/// <reference types="Cypress" />

describe("As a user visiting the 'all tables' page", () => {
  before(() => {
    cy.task("db:truncate", "SeasonOfTable");
    cy.task("db:truncate", "StatOfTable");
    cy.task("db:truncate", "Table");
    cy.task("db:truncate", "SeasonAverage");
    cy.task("db:truncate", "Player");
    cy.task("db:truncate", "User");
    cy.task("db:insert", {
      modelName: "User",
      json: { email: "user@example.com", userName: "user", password: "password" },
    });

    cy.visit("/user-sessions/new");
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("password");

    cy.get("form").submit();

    cy.get("input#name").type("Steve Nash");
    cy.get("input#season").type("2004");

    cy.get("form.add-player-form").submit();
    cy.wait(2000);

    cy.get("input#name").type("Dirk Nowitzki");
    cy.get("input#season").type("2010");

    cy.get("form.add-player-form").submit();
    cy.wait(2000);

    cy.get("select").select("Points");
    cy.get("select").select("Free Throws Made");

    cy.get("input#title").type("Dirk and Steve");

    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.get("li#sign-out").click();
    cy.wait(2000);
  });

  beforeEach(() => {
    cy.get("a#all-tables").click();
  });

  it("has a table tile", () => {
    cy.get(".table-tile").should("exist");
  });

  it("displays the title of the table", () => {
    cy.get(".table-title").should("have.text", "Dirk and Steve");
  });

  it("displays the username of the user that created the table", () => {
    cy.get(".table-userName").should("have.text", "By user");
  });

  it("displays the names of the players in the table", () => {
    cy.get(".table-players").should("have.text", "Players: Steve Nash, Dirk Nowitzki");
  });

  it("the title redirects the user to the table show page", () => {
    cy.get(".table-title").click();
    cy.url().should("include", "http://localhost:8765/tables/");
  });

  after(() => {
    cy.task("db:truncate", "SeasonOfTable");
    cy.task("db:truncate", "StatOfTable");
    cy.task("db:truncate", "Table");
    cy.task("db:truncate", "SeasonAverage");
    cy.task("db:truncate", "Player");
    cy.task("db:truncate", "User");
  })
});
