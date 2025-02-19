import FuelExpensePage from './fuelExpensePage'; // Імпортуємо FuelExpensePage

class GaragePage {
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

  openAddCarModal() {
    cy.log('Opening Add Car modal...');
    cy.contains('button', 'Add car').click();
    cy.get('app-add-car-form').should('be.visible');
  }

  fillCarForm(carDetails) {
    cy.log(`Filling car form with details: ${JSON.stringify(carDetails)}`);

    // Перехоплення запиту на створення машини
    cy.intercept('POST', '/api/cars').as('addCarRequest');

    cy.get('select[name="carBrandId"]').select(carDetails.brand);
    cy.get('select[name="carModelId"]').select(carDetails.model);
    cy.get('input[name="mileage"]')
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type('{selectall}{backspace}')
      .type(carDetails.mileage, { force: true })
      .blur();

    cy.get('.modal .btn.btn-primary')
      .should('not.be.disabled')
      .click();

    cy.log('Car form submitted successfully!');
  }

  waitForCarCreation() {
    cy.wait('@addCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      
      // Отримуємо ID машини з об'єкта data
      const carId = interception.response.body.data?.id;
      
      // Переконуємося, що carId не undefined
      expect(carId).to.not.be.undefined;
      
      // Зберігаємо ID в alias для подальшого використання
      cy.wrap(carId).as('createdCarId');
      
      cy.log(`Car was created with ID: ${carId}`);
    });
  }

  closeAddCarModal() {
    cy.log('Closing Add Car modal...');
    cy.get('.modal-footer > .btn-secondary').click();
    cy.get('app-add-car-form').should('not.be.visible');
  }

  addCar(carDetails) {
    cy.log(`Adding a car: ${JSON.stringify(carDetails)}`);
    this.openAddCarModal();
    this.fillCarForm(carDetails);
    this.waitForCarCreation();
    this.closeAddCarModal();
  }
}

export default GaragePage;
