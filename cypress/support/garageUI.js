class PageActions {
    visitPage() {
      const username = 'guest';
      const password = 'welcome2qauto';
      const url = `https://${username}:${password}@qauto.forstudy.space/`; 
      cy.log(`Visiting as guest: ${url}`);
      cy.visit(url);
    }
  
    login() {
      cy.log('Attempting to log in as test user...');
      cy.get('button.btn.btn-outline-white.header_signin', { timeout: 10000 }).should('be.visible').click();
      cy.get('#signinEmail').type('test1@example.com');
      cy.get('#signinPassword').type('Test1234', { sensitive: true });
      cy.get('.modal-footer > .btn-primary').click();
      cy.url().should('include', '/garage');
      cy.log('Login successful!');
    }
  
    checkGaragePageLoaded() {
      cy.log('Checking if Garage page is loaded...');
      cy.get('.panel-page_heading').should('be.visible');
    }
  
    navigateToExpenses() {
      // Ensure the button is visible and interactable
      cy.get('button[aria-expanded="false"]', { timeout: 5000 }).should('be.visible').click({ force: true });
  
      // Wait for the dropdown and click the "expenses" link
      cy.get('a[routerlink="expenses"]').should('be.visible').click();
  
      // Verify that the expenses page is loaded
      cy.url().should('include', '/panel/expenses');
    }
  
    selectLastCar() {
      // Open the car select dropdown
      cy.get('#carSelectDropdown').click();
  
      // Wait for the dropdown to appear, and select the first available car
      cy.get('.dropdown-menu li.car-select-dropdown_item:not(.disabled)').last().click();
    }
  
    verifyExpenseData(expenseDetails) {
      // Verify that the expense details appear in the table
      cy.get('tbody').within(() => {
        cy.contains('td', expenseDetails.mileage.toString()).should('exist');
        cy.contains('td', `${expenseDetails.liters}L`).should('exist');
        cy.contains('td', `${expenseDetails.totalCost.toFixed(2)} USD`).should('exist');
      });
    }
  }
  
  export default new PageActions();