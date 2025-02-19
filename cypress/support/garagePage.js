import FuelExpensePage from './fuelExpensePage'; // Імпортуємо FuelExpensePage

class GaragePage {
  visitPage() {
    const username = 'guest';
    const password = 'welcomeqauto';
    const url = `https://${username}:${password}@qauto.forstudy.space/`; 
    cy.log(`Visiting as guest: ${url}`);
    cy.visit(url);
  }

  login() {
    cy.log('Attempting to log in as test user...');
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

  // deleteAllCars() {
  //   cy.url().then((currentUrl) => {
  //     const baseUrl = Cypress.config('baseUrl') || 'https://qauto.forstudy.space';
  //     const garageUrl = `${baseUrl}/panel/garage`;
  
  //     if (!currentUrl.includes('/panel/garage')) {
  //       cy.visit(garageUrl);
  //     }
  
  //     cy.get('body').then(($body) => {
  //       if ($body.find('.car.jumbotron').length > 0) {
  //         cy.log('Found cars in garage. Starting deletion process...');
          
  //         cy.intercept('DELETE', '/api/cars/*').as('deleteCar');
  
  //         function removeNextCar() {
  //           cy.get('.car.jumbotron').first().within(() => {
  //             cy.get('button.car_edit').click();
  //           });
  
  //           cy.get('button.btn-outline-danger').contains('Remove car').click();
  //           cy.get('button.btn-danger').contains('Remove').click();
  
  //           // Чекаємо, поки запит завершиться
  //           cy.wait('@deleteCar', { timeout: 10000 });
  
  //           // Чекаємо, поки машина зникне з DOM
  //           cy.get('.car.jumbotron').should('have.length.lessThan', $body.find('.car.jumbotron').length);
  
  //           // Рекурсивно викликаємо метод, якщо ще є машини
  //           cy.get('.car.jumbotron').then((cars) => {
  //             if (cars.length > 0) {
  //               removeNextCar();
  //             }
  //           });
  //         }
  
  //         removeNextCar();
  
  //         // Остаточна перевірка, що гараж порожній
  //         cy.get('.car.jumbotron', { timeout: 10000 }).should('not.exist');
  //         cy.get('.panel-page_empty.panel-empty').should('be.visible')
  //           .contains('You don’t have any cars in your garage');
  //       } else {
  //         cy.log('No cars to delete.');
  //       }
  //     });
  //   });
  // }
  


  
  
  
  
}

export default GaragePage;