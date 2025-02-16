import GaragePage from './garagePage';

describe('Garage Page Tests using POM', () => {
  const garagePage = new GaragePage();
  const carDetails = {
    brand: 'Audi',
    model: 'TT',
    mileage: '50000'
  };

  beforeEach(() => {
    garagePage.visitPage();
    garagePage.login();
    garagePage.checkGaragePageLoaded();
    // Перехоплюємо запит на додавання автомобіля
    cy.intercept('POST', '/api/cars').as('addCarRequest');
  });

  it('should add a car successfully', () => {
    // Додаємо автомобіль
    garagePage.addCar(carDetails);
  
    // Перевіряємо, що запит на додавання авто завершився успішно
    cy.wait('@addCarRequest').then((interception) => {
      console.log(interception.response.body); // Вивести відповідь у консоль для аналізу
      expect(interception.response.statusCode).to.eq(201); // Очікуємо статус 201 - створено
  
      // Перевірка, чи є властивість 'data' і чи це об'єкт
      expect(interception.response.body.data).to.be.an('object');
      
      // Перевіряємо, чи має об'єкт властивість 'id'
      expect(interception.response.body.data).to.have.property('id');
    });
  });
  
});
