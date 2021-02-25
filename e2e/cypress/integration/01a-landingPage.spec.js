/// <reference types="Cypress" />

describe("As a user visiting the landing page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a welcome message header", () => {
    cy.get(".welcome-box").should("exist")

    cy.get(".welcome-header").should("have.text", "Welcome to Bucket List");
  });

  it("has a welcome message subheader", () => {
    cy.get(".welcome-subheader").should(
      "have.text",
      "the place to compare NBA players and stats with ease and efficiency."
    );
  });

  it("has a link to balldontlie", () => {
    cy.get("a.api-link")
      .contains("balldontlie API")
      .should("have.attr", "href", "http://balldontlie.io/");
  });

  it("adds a player to the table when form is submitted correctly", () => {
    cy.get("input#player").type("Steve Nash");
    cy.get("input#season").type("2004");

    cy.get("form.add-player-form").submit();

    cy.get("td#player-name").should("have.text", "Steve Nash");
    cy.get("td#season").should("have.text", "2004-05");

    cy.get(".welcome-box").should("not.exist")
  });

  it("adds a stat to the table when the user selects it", () => {
    cy.get("select").select("Assists")
    cy.get("select").select("Rebounds")
    cy.get("th#AST").should("have.text", "AST")
    cy.get("th#REB").should("have.text", "REB")

    cy.get(".welcome-box").should("not.exist")
  });

  it("clears the table", () => {
    cy.get("input#player").type("Steve Nash");
    cy.get("input#season").type("2004");
    
    cy.get("form.add-player").submit();
    
    cy.get("select").select("Assists")
    cy.get("select").select("Rebounds")

    cy.get(".clear-button").click()
    cy.get("table").should("not.exist")
  })
});
