/// <reference types="Cypress" />

describe("As the user that created the table visiting the edit page", () => {
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
    cy.wait(3000);

    cy.get("input#name").type("Dirk Nowitzki");
    cy.get("input#season").type("2010");

    cy.get("form.add-player-form").submit();
    cy.wait(3000);

    cy.get("select").select("Offensive Rebounds");
    cy.get("select").select("Blocks");

    cy.get("input#title").type("Dirk and Steve");

    cy.get("form.save-table-form").submit();
    cy.wait(10000);
  });

  beforeEach(() => {
    cy.get("a#all-tables").click();
    cy.wait(3000);
    cy.get(".table-title").find("a").click();
    cy.get("button.edit-button").click();
  });

  it("adds a player and saves the updated table", () => {
    cy.get("input#name").type("Tim Duncan");
    cy.get("input#season").type("2006");

    cy.get("form.add-player-form").submit();
    cy.wait(4000);

    cy.get("tr#Tim-Duncan").find("td#player-name").should("have.text", "Tim Duncan");
    cy.get("tr#Tim-Duncan").find("td#season").should("have.text", "2006-07");

    cy.get("form.edit-table-form").submit();
    cy.wait(3000);

    cy.get("tr#Tim-Duncan").find("td#player-name").should("have.text", "Tim Duncan");
    cy.get("tr#Tim-Duncan").find("td#season").should("have.text", "2006-07");
  });

  it("removes a player and saves the updated table", () => {
    cy.get("tr#Steve-Nash").find("td.remove-button").click();

    cy.get("tr#Steve-Nash").should("not.exist");

    cy.get("form.edit-table-form").submit();
    cy.wait(3000);

    cy.get("tr#Steve-Nash").should("not.exist");
  });

  it("updates the title", () => {
    cy.get("input#title").clear();
    cy.get("input#title").type("Nowitzki vs. Duncan");

    cy.get("form.edit-table-form").submit();
    cy.wait(3000);

    cy.get("h1.title-show-page").should("have.text", "Nowitzki vs. Duncan");
  });

  it("updates the notes", () => {
    cy.get("textarea#notes").type("My Favorite Power Forwards");

    cy.get("form.edit-table-form").submit();
    cy.wait(3000);

    cy.get(".notes-show-page").should("have.text", "My Favorite Power Forwards");
  });

  it("displays a link back to the table's show page", () => {
    cy.get("a.back-to-table").should("have.text", "Back To Table").click();
    cy.url().should("include", "/tables/");
  });

  it("remains on the edit page and shows errors if form is submitted without a title", () => {
    cy.get("input#title").clear();

    cy.get("form.edit-table-form").submit();
    cy.wait(3000);

    cy.get("ul.errors").find("li").first().should("have.text", "Title is a required property");
  });

  it("remains on the edit page and shows errors if form is submitted without players", () => {
    cy.get("tr#Dirk-Nowitzki").find("td.remove-button").click();
    cy.get("tr#Tim-Duncan").find("td.remove-button").click();

    cy.get("form.edit-table-form").submit();
    cy.wait(3000);

    cy.get("ul.errors").find("li").first().should("have.text", "Players should not be empty");
  });

  it("does not make any changes to the table if form is submitted incorrectly", () => {
    cy.get("a.back-to-table").click();

    cy.get("h1.title-show-page").should("have.text", "Nowitzki vs. Duncan");
    cy.get("tr#Tim-Duncan").find("td#player-name").should("have.text", "Tim Duncan");
    cy.get("tr#Tim-Duncan").find("td#season").should("have.text", "2006-07");
    cy.get("tr#Dirk-Nowitzki").find("td#player-name").should("have.text", "Dirk Nowitzki");
    cy.get("tr#Dirk-Nowitzki").find("td#season").should("have.text", "2010-11");
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
