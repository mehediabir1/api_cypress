/// <reference types="Cypress" />

describe("API_demoqa", () => {
  let Token;
  // let userId;
  let usrnm;
  // let UUID;

  it("Authorized_post", () => {
    cy.request("POST", "https://demoqa.com/Account/v1/Authorized", {
      userName: "abir_m",
      password: "@Sd@Sd123",
    }).should((response) => {
      console.log(response.body);
      //expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  it("Token_post", () => {
    cy.request("POST", "https://demoqa.com/Account/v1/GenerateToken", {
      userName: "abir_m",
      password: "@Sd@Sd123",
    }).then((response) => {
      //console.log(response.body);
      expect(response.status).to.eq(200);
      Token = response.body.token;
      cy.log("Authorization token is: " + Token);
    });
  });

  it("User_post", () => {
    let UUID;
    cy.request("POST", "https://demoqa.com/Account/v1/User", {
      userName: "abir_m"+ Math.floor(Math.random() * 100) + 2,
      // userName: "abir_m11bafw23",
      password: "@Sd@Sd123",
    }).then((response) => {
      //console.log(response.body);
      expect(response.status).to.eq(201);
      UUID = response.body.userID;
      usrnm = response.body.username;
      cy.log("User ID is: " + UUID + " and Username is: " + usrnm);
    }).as("create");
  // });

  // it("User_delete", () => {
    // cy.wait("@create")
    cy.request({
      method: "DELETE",
      url: "https://demoqa.com/Account/v1/User/" + UUID,
      headers: {
        Authorization: "Bearer "+Token,
      }
    })
    .then((response) => {
      //console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });
});
