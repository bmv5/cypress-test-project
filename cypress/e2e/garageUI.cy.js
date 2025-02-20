// expenses.spec.js

import pageActions from '../support/garageUI'; // Імпортуємо POM

describe('Expense Tests', () => {
  before(() => {
    pageActions.visitPage(); // Відвідуємо сторінку
    pageActions.login(); // Логін
    pageActions.checkGaragePageLoaded(); // Перевіряємо, що сторінка Garage завантажена
  });

  it('Should navigate to expenses page and verify data', () => {
    pageActions.navigateToExpenses(); // Перехід на сторінку витрат

    const expenseDetails = {
      mileage: 60000,
      liters: 20,
      totalCost: 1000
    };

    pageActions.verifyExpenseData(expenseDetails); // Перевірка витрат у таблиці
  });
});
