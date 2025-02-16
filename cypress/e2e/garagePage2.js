import FuelExpensePage from './fuelExpensePage'; // Імпортуємо FuelExpensePage

class GaragePage {
  visitPage() {
    const username = 'guest';
    const password = 'welcome2qauto';
    const url = `https://${username}:${password}@qauto2.forstudy.space/`; 
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

  //Видаляє всі машини, але падає через те, що очікує на машини після того як всі були видалені
  // deleteAllCars() {
  //   cy.url().then((currentUrl) => {
  //     const baseUrl = Cypress.config('baseUrl') || 'https://qauto.forstudy.space';
  //     cy.log(`Current URL: ${currentUrl}`);
  //     cy.log(`Base URL from config: ${baseUrl}`);
  
  //     if (!baseUrl) {
  //       throw new Error("baseUrl is not defined in Cypress config!");
  //     }
  
  //     const garageUrl = `${baseUrl}/panel/garage`;
  //     cy.log(`Garage URL: ${garageUrl}`);
  
  //     if (!currentUrl.includes('/panel/garage')) {
  //       cy.log(`Navigating to: ${garageUrl}`);
  //       cy.visit(garageUrl);
  //     }
  
  //     cy.get('body').then(($body) => {
  //       const carsCount = $body.find('.car.jumbotron').length;
  //       cy.log(`Found ${carsCount} cars in garage.`);
  
  //       if (carsCount > 0) {
  //         cy.log('Starting to remove cars...');
          
  //         let removedCars = 0;
  
  //         // Цикл для видалення кожної машини
  //         cy.get('.car.jumbotron').each((car, index) => {
  //           cy.wrap(car).within(() => {
  //             // Для кожної машини клікаємо на кнопку редагування
  //             cy.get('button.car_edit').should('be.visible').click();
  //           });
  
  //           // Клікаємо на кнопку видалення машини
  //           cy.get('button.btn-outline-danger').contains('Remove car').should('be.visible').click();
  //           cy.get('button.btn-danger').contains('Remove').should('be.visible').click();
  
  //           cy.wait(1000);
  
  //           cy.log(`Car ${index + 1} removed.`);
  
  //           removedCars++;
  
  //           // Якщо залишились машини, чекаємо перед наступним видаленням
  //           if (removedCars < carsCount) {
  //             cy.wait(3000); // Чекаємо 3 секунди перед наступним видаленням
  //             cy.get('.car.jumbotron').should('have.length', carsCount - removedCars); // перевіряємо, що машини оновились
  //           }
  //         });
  
  //         // Тепер перевіряємо, що всі машини видалені
  //         cy.get('.car.jumbotron', { timeout: 10000 }).should('not.exist');
  //         cy.log('All cars deleted.');
  //       } else {
  //         cy.log('No cars to delete.');
  //       }
  //     });
  //   });
  // }
  
  deleteAllCars() {
    cy.url().then((currentUrl) => {
      const baseUrl = Cypress.config('baseUrl') || 'https://qauto.forstudy.space';
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
          cy.log('Starting to remove cars...');
          
          let removedCars = 0;
  
          // Цикл для видалення кожної машини
          cy.get('.car.jumbotron').each((car, index) => {
            cy.wrap(car).within(() => {
              // Для кожної машини клікаємо на кнопку редагування
              cy.get('button.car_edit').should('be.visible').click();
            });
  
            // Клікаємо на кнопку видалення машини
            cy.get('button.btn-outline-danger').contains('Remove car').should('be.visible').click();
            cy.get('button.btn-danger').contains('Remove').should('be.visible').click();
  
            cy.wait(1000);
  
            cy.log(`Car ${index + 1} removed.`);
  
            removedCars++;
  
            // Перевіряємо наявність машин після кожного видалення
            cy.get('.car.jumbotron').should('have.length', carsCount - removedCars); // перевіряємо, що машини оновились
  
            // Якщо залишились машини, чекаємо перед наступним видаленням
            if (removedCars < carsCount) {
              cy.wait(3000); // Чекаємо 3 секунди перед наступним видаленням
            }
          });
  
          // Після того, як всі машини видалені, припиняємо очікувати на список машин
          cy.get('.car.jumbotron', { timeout: 10000 }).should('not.exist');
          cy.log('All cars deleted.');
  
          // Перевіряємо, чи потрібно чекати на запит getCars
          cy.intercept('GET', '/api/cars').as('getCars');  // Заміни на правильний запит
  
          // Якщо більше не залишається машин, припиняємо чекати на запит
          cy.get('.car.jumbotron').should('not.exist'); // Перевіряємо, чи всі машини видалені
          cy.wait('@getCars', { timeout: 0 }).should('not.exist'); // Якщо машин більше немає, не чекаємо на запит
        } else {
          cy.log('No cars to delete.');
        }
      });
    });
  }
  
  
  
  
}

export default GaragePage;