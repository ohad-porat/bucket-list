/// <reference types="Cypress" />

describe("As a user visiting a table's show page", () => {
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

    cy.get("select").select("Field Goals Made");
    cy.get("select").select("Turnovers");

    cy.get("input#title").type("Dirk and Steve");
    cy.get("textarea#notes").type("The Best Duo");

    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.get("li#sign-out").click();
    cy.wait(2000);
  });

  beforeEach(() => {
    cy.get("a#all-tables").click();
    cy.get(".table-title").find("a").click();
  });

  it("has a title", () => {
    cy.get("h1.title-show-page").should("have.text", "Dirk and Steve");
  });

  it("displays the name of the user that created the table", () => {
    cy.get("p.userName-show-page").should("have.text", "By user");
  });

  it("has notes", () => {
    cy.get(".notes-header-show-page").should("have.text", "Notes:");
    cy.get(".notes-show-page").should("have.text", "The Best Duo");
  });

  it("displays the players and seasons in the table", () => {
    cy.get("tr#Steve-Nash").find("td#player-name").should("have.text", "Steve Nash");
    cy.get("tr#Steve-Nash").find("td#season").should("have.text", "2004-05");
    cy.get("tr#Dirk-Nowitzki").find("td#player-name").should("have.text", "Dirk Nowitzki");
    cy.get("tr#Dirk-Nowitzki").find("td#season").should("have.text", "2010-11");
  });

  it("displays the stats in the table", () => {
    cy.get("th#FGM").should("have.text", "FGM");
    cy.get("th#TOV").should("have.text", "TOV");
  });

  it("does not allow an unauthenticated user to edit the table", () => {
    cy.get("button.edit-button").should("not.exist");
  });

  it("does not allow an unauthenticated user to delete the table", () => {
    cy.get("input.delete-button").should("not.exist");
  });

  it("allows the user that created the table to edit it", () => {
    cy.visit("/user-sessions/new");
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("password");

    cy.get("form").submit();
    cy.wait(2000);

    cy.get("a#all-tables").click();
    cy.get(".table-title").find("a").click();

    cy.get("button.edit-button").click();

    cy.url().should("include", "/edit");
  });

  it("allows the user that created the table to delete it", () => {
    cy.visit("/user-sessions/new");
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("password");

    cy.get("form").submit();
    cy.wait(2000);

    cy.get("a#all-tables").click();
    cy.get(".table-title").find("a").click();

    cy.get("input.delete-button").click();

    cy.url().should("include", "/my-tables");
    cy.get(".table-tile").should("not.exist");
  });
});
