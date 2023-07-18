/// <reference types="Cypress" />

describe("API_demoqa", () => {
    let url = "https://6ammart.sixamtech.com/dev";
    let token;
    let fnm
    let description;
    
    it("Register_customer", () => {
      cy.request("POST", url+"/api/v1/auth/sign-up", {
        f_name: "demo A",
        l_name: "BB",
        email: "test1@gmail.com",
        phone: "+88017495521555",
        password: "@Sd@Sd12345",
      }).should((response) => {
        
        expect(response.status).to.eq(200);
       // expect(response.body).to.eq(true);
      });
    });


    it("Login_customer", () => {
        cy.request("POST", url+"/api/v1/auth/login", {
          phone: "+88017495521555",
          password: "@Sd@Sd12345",
        }).then((response) => {
          
          expect(response.status).to.eq(200);
          token = response.body.token;
          cy.log(token)
        });
      });
      

      it("get_info", () => {
        cy.request({
            method: "GET",
            url: url+"/api/v1/customer/info",
            headers: {
            Authorization:"Bearer "+token
            }
          }).then((response) => {
          
            expect(response.status).to.eq(200);
           // fnm = response.l_name
            cy.log("as " + fnm)
        });

 
      });

      it.only("item_campaigns", () => {
        cy.request({
            method: "GET",
            url: url+"/api/v1/campaigns/item",
            headers: {
              zoneId:'[1]',
              moduleId:1
            }
          }).then((response) => {
          
            expect(response.status).to.eq(200);
           // fnm = response.l_name
          description = response.body.description;
          cy.log(description)

        });

 
      });
    
    
  });
  