import GaragePage from './garagePage';

describe('Garage Page Tests using POM', () => {
  const garagePage = new GaragePage();
  const carDetails = {
    brand: 'Audi',
    model: 'TT',
    mileage: '50000'
  };

  let carId; // Змінна для збереження ID створеної машини

  beforeEach(() => {
    garagePage.visitPage();
    garagePage.login();
    garagePage.checkGaragePageLoaded();
    cy.intercept('POST', '/api/cars').as('addCarRequest');
  });

  it('should add a car and validate its presence in the cars list', () => {
    // Додаємо автомобіль через UI
    garagePage.addCar(carDetails);

    // Перехоплюємо запит і отримуємо ID створеної машини
    cy.wait('@addCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      carId = interception.response.body.data.id;
      expect(carId).to.exist; // Переконуємося, що ID отримано

      // Робимо GET-запит, щоб отримати список машин
      cy.request('/api/cars').then((response) => {
        const cars = response.body.data;
      
        console.log("Full Cars List:", cars);
        cy.log(`Full Cars List: ${JSON.stringify(cars)}`);
      
        const addedCar = cars.find(car => car.id === carId);
      
        console.log("Found Car:", addedCar);
        cy.log(`Found Car: ${JSON.stringify(addedCar)}`);
      
        expect(addedCar).to.exist;
      
        // Перевірка:
        expect(addedCar.brand).to.eq(carDetails.brand); // brand в відповіді API
        expect(addedCar.model).to.eq(carDetails.model); // model в відповіді API
        expect(addedCar.mileage).to.eq(Number(carDetails.mileage)); // mileage в відповіді API
      });
      
      
      
    });
  });
});
