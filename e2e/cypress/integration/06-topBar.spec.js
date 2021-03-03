/// <reference types="Cypress" />

describe("Top bar", () => {
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
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("is displayed on all pages", () => {
    cy.get(".top-bar").should("exist");

    cy.get("a#all-tables").click();

    cy.get(".top-bar").should("exist");
  });

  it("has an image of the logo that links to the landing page", () => {
    cy.get("img.top-bar-logo").should("have.attr", "src", "https://i.ibb.co/r3DCrp4/logo.png");
    cy.get("a.top-bar-logo-link").should("have.attr", "href", "/");
  });

  it("displays a clickable link to the 'all tables' page with the correct text and href", () => {
    cy.get("a#all-tables")
      .should("have.text", "All Tables")
      .and("have.attr", "href", "/all-tables");
  });

  it("displays a clickable link to the registration form with the correct text and href", () => {
    cy.get("a.sign-up-button")
      .should("have.text", "Sign Up")
      .and("have.attr", "href", "/users/new");
  });

  it("displays a clickable link to the sign in form with the correct text and href", () => {
    cy.get("li#sign-in")
      .find("a")
      .should("have.text", "Sign In")
      .and("have.attr", "href", "/user-sessions/new");
  });

  describe("for a signed in user", () => {
    beforeEach(() => {
      cy.visit("/user-sessions/new");
      cy.get("#email").type("user@example.com");
      cy.get("#password").type("password");

      cy.get("form").submit();
      cy.wait(3000);
    });
    it("displays a welcome message with the user's username", () => {
      cy.get("li.hello-user").should("have.text", "Hello, user");
    });

    it("displays a clickable link to the 'my tables' page with the correct text and href", () => {
      cy.get("a#my-tables")
        .should("have.text", "My Tables")
        .and("have.attr", "href")
        .and("include", "/my-tables");
    });

    it("has a sign out button", () => {
      cy.get("li#sign-out").find("button").should("have.text", "Sign Out");
    });
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
