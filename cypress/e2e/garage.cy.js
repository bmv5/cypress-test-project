// import GaragePage from './garagePage';
// import FuelExpensePage from './fuelExpensePage';
import GaragePage from '../support/garagePage';
import FuelExpensePage from '../support/fuelExpensePage';

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
    // Додаємо автомобіль
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

  
});


  
  

