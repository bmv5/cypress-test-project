import FuelExpensePage from './fuelExpensePage'; // Імпортуємо FuelExpensePage

class GaragePage {
  visitAndLogin() {
    const username = 'guest';
    const password = 'welcome2qauto';
    const url = `https://${username}:${password}@qauto.forstudy.space/`; 
    cy.log(`Visiting URL: ${url}`);
    cy.visit(url); // Авторизація через URL

    // Логін через форму після переходу на сторінку
    this.login();
  }

  login() {
    cy.log('Attempting to log in...');
    cy.get('button.btn.btn-outline-white.header_signin').click();
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

  openAddCarModal() {
    cy.log('Opening Add Car modal...');
    cy.contains('button', 'Add car').click();
    cy.get('app-add-car-form').should('be.visible');
  }

  fillCarForm(carDetails) {
    cy.log(`Filling car form with details: ${JSON.stringify(carDetails)}`);
    cy.get('select[name="carBrandId"]').select(carDetails.brand);
    cy.get('select[name="carModelId"]').select(carDetails.model);
    cy.get('input[name="mileage"]')
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type('{selectall}{backspace}');  // Очистка значення перед введенням
    cy.wait(300); // Невелика затримка
    cy.get('input[name="mileage"]').type('60000', { force: true }).blur();

    cy.get('.modal .btn.btn-primary')
      .should('not.be.disabled')  // Перевіряємо, що кнопка не заблокована
      .click();
    cy.log('Car form submitted successfully!');
  }

  closeAddCarModal() {
    cy.log('Closing Add Car modal...');
    cy.get('.modal-footer > .btn-secondary').click();
    cy.get('app-add-car-form').should('not.be.visible');
  }

  addCar(carDetails) {
    cy.log(`Adding a car: ${JSON.stringify(carDetails)}`);
    cy.contains('button', 'Add car').click();
    cy.get('app-add-car-form').should('be.visible');
    cy.get('select[name="carBrandId"]').select(carDetails.brand);
    cy.get('select[name="carModelId"]').select(carDetails.model);
    cy.get('input[name="mileage"]').clear().type(carDetails.mileage);
    cy.get('.modal-footer > .btn-primary').click({ force: true });
    cy.log('Car added successfully!');
  }

  addFuelExpense(expenseDetails) {
    cy.log(`Adding fuel expense: ${JSON.stringify(expenseDetails)}`);
    const fuelExpensePage = new FuelExpensePage();

    fuelExpensePage.openAddExpenseModal();
    fuelExpensePage.fillExpenseForm(expenseDetails);
    fuelExpensePage.submitExpense();
    cy.log('Fuel expense added successfully!');
  }

  deleteAllCars() {
    cy.url().then((currentUrl) => {
      const baseUrl = Cypress.config('baseUrl');

      cy.log(`Current URL: ${currentUrl}`);
      cy.log(`Base URL from config: ${baseUrl}`);

      if (!baseUrl) {
        throw new Error("baseUrl is not defined in Cypress config!");
      }

      const garageUrl = `${baseUrl}/panel/garage`;
      cy.log(`Garage URL: ${garageUrl}`);

      if (!currentUrl.includes('/panel/garage')) {
        cy.log(`Navigating to: ${garageUrl}`);
        cy.visit(garageUrl);
      }

      cy.get('body').then(($body) => {
        const carsCount = $body.find('.car.jumbotron').length;
        cy.log(`Found ${carsCount} cars in garage.`);

        if (carsCount > 0) {
          cy.get('.car.jumbotron').first().within(() => {
            cy.get('button.car_edit').should('be.visible').click();
          });

          cy.get('button.btn-outline-danger').contains('Remove car').should('be.visible').click();
          cy.get('button.btn-danger').contains('Remove').should('be.visible').click();

          cy.wait(1000);
          
          cy.log('Waiting for car to be removed...');
          cy.get('.car.jumbotron', { timeout: 5000 }).should('not.exist');
          
          cy.log('Car removed, checking for more...');
          this.deleteAllCars();
        } else {
          cy.log('All cars deleted.');
        }
      });
    });
  }

  checkGarageIsEmpty() {
    cy.log('Checking if the garage is empty...');
    cy.get('.panel-empty_message', { timeout: 7000 }).should('be.visible')
      .and('have.text', "You don’t have any cars in your garage");
  }

  checkNoCars() {
    cy.log('Checking that no cars exist in the garage...');
    cy.get('.car.jumbotron', { timeout: 10000 }).should('not.exist');
  }
}

export default GaragePage;
