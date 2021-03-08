/// <reference types="Cypress" />

describe("As a signed in user visiting the landing page", () => {
  before(() => {
    cy.task("db:truncate", "User");
    cy.task("db:insert", {
      modelName: "User",
      json: { email: "user@example.com", userName: "user", password: "password" },
    });
  });

  beforeEach(() => {
    cy.task("db:truncate", "SeasonOfTable");
    cy.task("db:truncate", "StatOfTable");
    cy.task("db:truncate", "Table");
    cy.task("db:truncate", "SeasonAverage");
    cy.task("db:truncate", "Player");
    cy.visit("/user-sessions/new");
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("password");

    cy.get("form").submit();
    cy.wait(2000);

    cy.visit("/");
  });

  it("doesn't have a welcome message", () => {
    cy.get(".welcome-box").should("not.exist");
  });

  it("saves a table when form is submitted correctly and redirects to the show table page", () => {
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

    cy.get("input#title").type("Test");

    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.url().should("include", "http://localhost:8765/tables/");

    cy.get("h1.title-show-page").should("have.text", "Test");
    cy.get("tr#Steve-Nash").find("td#player-name").should("have.text", "Steve Nash");
    cy.get("tr#Steve-Nash").find("td#season").should("have.text", "2004-05");
    cy.get("th#PTS").should("have.text", "PTS");
    cy.get("th#FTM").should("have.text", "FTM");
  });

  it("remains on the landing page and shows errors if form is submitted without a title", () => {
    cy.get("input#name").type("Steve Nash");
    cy.get("input#season").type("2004");

    cy.get("form.add-player-form").submit();
    cy.wait(2000);

    cy.get("select").select("Points");
    cy.get("select").select("Free Throws Made");

    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.get("ul.errors").find("li").first().should("have.text", "Title is a required property");
  });

  it("remains on the landing page and shows errors if form is submitted without players", () => {
    cy.get("select").select("Points");
    cy.get("select").select("Free Throws Made");

    cy.get("input#title").type("Test");
    cy.wait(2000);

    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.get("ul.errors").find("li").first().should("have.text", "Players should not be empty");
  });

  it("remains on the landing page and shows errors if form is submitted without players", () => {
    cy.get("input#name").type("Steve Nash");
    cy.get("input#season").type("2004");

    cy.get("form.add-player-form").submit();
    cy.wait(4000);

    cy.get("input#title").type("Test");

    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.get("ul.errors").find("li").first().should("have.text", "Stats should not be empty");
  });

  it("does not add an empty table to the 'all tables' page if form is submitted incorrectly", () => {
    cy.get("form.save-table-form").submit();
    cy.wait(2000);

    cy.get("a#all-tables").click();

    cy.get(".table-tile").should("not.exist");
  });

  after(() => {
    cy.task("db:truncate", "SeasonOfTable");
    cy.task("db:truncate", "StatOfTable");
    cy.task("db:truncate", "Table");
    cy.task("db:truncate", "SeasonAverage");
    cy.task("db:truncate", "Player");
    cy.task("db:truncate", "User");
  });
});
