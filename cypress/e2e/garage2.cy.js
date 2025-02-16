import GaragePage from './garagePage2';
import FuelExpensePage from './fuelExpensePage2';

describe('Garage Page Tests using POM', () => {
  const garagePage = new GaragePage();
  const fuelExpensePage = new FuelExpensePage();

  beforeEach(() => {
    garagePage.visitPage();
    garagePage.login();
    garagePage.checkGaragePageLoaded();
  });

  it('should open the Add Car modal, enter values, check validation, and close it', () => {
    const carDetails = {
      brand: 'Audi',
      model: 'TT',
      mileage: '50000'
    };

    garagePage.openAddCarModal();
    garagePage.fillCarForm(carDetails);
    garagePage.closeAddCarModal();
  });

  it('should add a car, open the fuel expense modal, fill the form, and add expense', () => {
    const carDetails = {
      brand: 'Audi',
      model: 'TT',
      mileage: '50000'
    };

    // Додаємо автомобіль лише якщо його ще немає
    garagePage.addCar(carDetails);

    // Переходимо у вкладку "Fuel Expenses"
    fuelExpensePage.navigateToExpenses();

    // Вибираємо перший автомобіль у списку
    fuelExpensePage.selectFirstCar();

    // Відкриваємо модалку витрат на паливо
    fuelExpensePage.openAddExpenseModal();

    // Заповнюємо форму
    const expenseDetails = {
      mileage: '70000',
      liters: '50',
      totalCost: '100'
    };

    fuelExpensePage.fillExpenseForm(expenseDetails);
    fuelExpensePage.submitExpense();
  });

  it('should delete all cars and check the garage is empty', () => {
    cy.get('body').then(($body) => {
      // Якщо є кнопка "Log out", значить користувач залогінений
      if ($body.find('.btn-link.text-danger.btn-sidebar').length) {
  
        // Видаляємо всі машини
        garagePage.deleteAllCars();
  
        // Чекаємо, поки всі машини будуть видалені
        cy.get('.car.jumbotron', { timeout: 10000 }).should('not.exist'); // Перевіряємо, що всі машини видалено
  
        // Тепер можна чекати на запит XHR (якщо є)
        cy.intercept('GET', '/api/cars').as('getCars');
        cy.wait('@getCars', { timeout: 10000 }).should('not.exist'); // Чекаємо на запит, якщо він відправлений
      }
    });
  });
  
  
});
