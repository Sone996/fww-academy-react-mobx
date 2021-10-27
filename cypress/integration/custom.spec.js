/// <reference types="cypress" />

describe("custom test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  after(() => {
    cy.wait(3000);
    cy.contains("Logout").click();
  });
  it("login as professor, go to single course and return to dashboard", () => {
    let courseName = "cypress";
    let coursePrice = 3000;
    let courseDesc = "cypress desc";
    // dobavio ovo dinamicki!!!
    var idFromUrl = 88; // increment before test!!!!!!!! next is 91

    //login
    cy.get("[placeholder=E-mail]").type("jason.statham@gmail.com");
    cy.get("[placeholder=password]").type("mightyme");
    cy.get(".button").contains("Login").click();

    // create new course
    cy.contains(/New Course/i).click();
    cy.get("[placeholder=Name]").type(courseName);
    cy.get("[placeholder=Price]").type(coursePrice);
    cy.get("[placeholder=Description]").type(courseDesc);
    cy.contains(/create/i).click();

    // check if fileds are empty after submit
    cy.get("[placeholder=Name]").should("be.empty");
    cy.get("[placeholder=Price]").should("be.empty");
    cy.get("[placeholder=Description]").should("be.empty");
    cy.contains(/home/i).click();
    cy.get("table").contains("td", courseName).should("exist");

    // logout and logout as student
    cy.contains("Logout").click();
    cy.get("[placeholder=E-mail]").type("elena.lemonis@gmail.com");
    cy.get("[placeholder=password]").type("mightyElena");
    cy.get(".button").contains("Login").click();

    // find taht course, click on it and buy it
    cy.get("table").contains("td", courseName).click();
    cy.url().then((url) => {
      cy.log(url);
    });
    cy.get("[data-cy=buyCourseComment]").type("I love cypress");
    cy.contains("BUY").click();

    // again log as teacher and go to student aplications
    cy.contains("Logout").click();
    cy.get("[placeholder=E-mail]").type("jason.statham@gmail.com");
    cy.get("[placeholder=password]").type("mightyme");
    cy.get(".button").contains("Login").click();
    cy.contains(/student aplications/i).click();
    cy.contains(/Inactive/i).click();

    // find that aplication and accept it
    cy.get("table").find(`[data-cy=course_id_${idFromUrl}]`).click();
    cy.contains("Accept").click();

    // set that course is completed\
    cy.contains("Active").click();
    cy.get("table").find(`[data-cy=course_id_${idFromUrl}]`).click();
    cy.contains("Complete").click();

    // log as student and rate course
    cy.contains("Logout").click();
    cy.get("[placeholder=E-mail]").type("elena.lemonis@gmail.com");
    cy.get("[placeholder=password]").type("mightyElena");
    cy.get(".button").contains("Login").click();
    cy.get("[data-cy=rateComment]").type("I am auto");
    cy.get("[data-cy=rateGrade]").type(4);
    cy.contains("Send").click();

    // log as teacher
    cy.contains("Logout").click();
    cy.get("[placeholder=E-mail]").type("jason.statham@gmail.com");
    cy.get("[placeholder=password]").type("mightyme");
    cy.get(".button").contains("Login").click();

    // go to home and find course go to course and check if data match and delete course
    cy.get("table").contains("td", courseName).click();
    cy.get("[data-cy=courseName]")
      .contains(`Name: ${courseName}`)
      .should("be.visible");
    cy.get("[data-cy=coursePrice]")
      .contains(`Price: ${coursePrice}`)
      .should("be.visible");
    if (courseDesc && courseDesc != "") {
      cy.get("[data-cy=courseDescription]")
        .contains(courseDesc)
        .should("be.visible");
    } else {
      cy.get("[data-cy=courseDescription]").should("be.empty");
    }
    cy.contains("Delete").click();
    // check if course is deleted
    cy.get("table").contains("td", courseName).should("not.exist");
  });
});
