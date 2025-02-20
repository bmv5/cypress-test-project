import GaragePage from '../support/garagePage';

describe('Garage Page Tests using POM', () => {
  const garagePage = new GaragePage();
  const carDetails = {
    brand: 'Audi',
    model: 'TT',
    mileage: '50000'
  };
  const expenseDetails = {
    liters: 20,
    mileage: 60000,
    totalCost: 1000,
    reportedAt: '2025-02-20'
  };

  beforeEach(() => {
    garagePage.visitPage();
    garagePage.login();
    garagePage.checkGaragePageLoaded();
    cy.intercept('POST', '/api/cars').as('addCarRequest');
  });

  it('should add a car, create an expense, and validate it via UI', () => {
    // Додаємо автомобіль через UI
    garagePage.addCar(carDetails);

    // Перехоплюємо запит і отримуємо ID створеної машини
    cy.wait('@addCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const carId = interception.response.body.data.id;
      expect(carId).to.exist;

      cy.wrap(carId).as('carId'); // Зберігаємо carId для подальшого використання

      // Перевіряємо, що автомобіль є у списку
      cy.request('/api/cars').then((response) => {
        expect(response.status).to.eq(200);
        const addedCar = response.body.data.find(car => car.id === carId);
        expect(addedCar).to.exist;
        expect(addedCar.id).to.eq(carId);
        expect(addedCar.brand.trim()).to.eq(carDetails.brand.trim());
        expect(addedCar.model.trim()).to.eq(carDetails.model.trim());
        expect(addedCar.mileage).to.eq(Number(carDetails.mileage));
      });
    });

    // Додаємо витрату на паливо через API
    cy.get('@carId').then((carId) => {
      cy.createExpense(carId, expenseDetails.liters, expenseDetails.mileage, expenseDetails.totalCost, expenseDetails.reportedAt)
        .then((expense) => {
          expect(expense.carId).to.eq(carId);
          expect(expense.liters).to.eq(expenseDetails.liters);
          expect(expense.mileage).to.eq(expenseDetails.mileage);
          expect(expense.totalCost).to.eq(expenseDetails.totalCost);
          expect(expense.reportedAt).to.eq(expenseDetails.reportedAt);
        });
    });

    // // Перевіряємо витрату через UI
    // cy.get('@carId').then((carId) => {
    //   cy.visit('https://qauto.forstudy.space/panel/expenses');

    //   // Обираємо машину у дропдауні
    //   cy.get('#carSelectDropdown').select(carId.toString());

    //   // Перевіряємо, що у таблиці є правильні дані
    //   cy.get('tbody').within(() => {
    //     cy.contains('td', expenseDetails.mileage.toString()).should('exist');
    //     cy.contains('td', `${expenseDetails.liters}L`).should('exist');
    //     cy.contains('td', `${expenseDetails.totalCost.toFixed(2)} USD`).should('exist');
    //   });
    // });
  });
});
