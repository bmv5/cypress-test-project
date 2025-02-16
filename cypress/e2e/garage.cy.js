import GaragePage from './garagePage';

describe('Garage Page Tests using POM', () => {
  const garagePage = new GaragePage();
  const carDetails = {
    brand: 'Audi',
    model: 'TT',
    mileage: '50000'
  };

  let carId; // Змінна для збереження id автомобіля

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
      
      // Зберігаємо id створеного автомобіля у змінну
      carId = interception.response.body.data.id;

      // Додатково можна вивести id в консоль для перевірки
      console.log('Car ID:', carId);
    });
  });

  // Приклад тесту для використання збереженого id
  it('should verify car exists by id', () => {
    cy.request(`/api/cars/${carId}`).then((response) => {
      console.log('Response Body:', response.body); // Вивести весь об'єкт відповіді
      expect(response.status).to.eq(200);
      
      // Перевірити, чи є 'id' у відповіді
      expect(response.body.data).to.have.property('id', carId);

    });
  });


});
