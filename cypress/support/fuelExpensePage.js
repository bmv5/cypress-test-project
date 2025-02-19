class FuelExpensePage {
    navigateToExpenses() {
        cy.get('button[aria-expanded="false"]').click({ force: true });

        // Чекаємо, поки випадаюче меню стане видимим
        cy.get('a[routerlink="expenses"]').should('be.visible').click();
      
        // Перевіряємо, що ми на правильній сторінці
        cy.url().should('include', '/panel/expenses');
    }

    selectFirstCar() {
        // Відкриваємо випадаючий список
        cy.get('#carSelectDropdown').click();

        cy.wait(2000); // Чекаємо 2 секунди
        // Чекаємо, поки випадаючий список з'явиться, і вибираємо перший доступний елемент <li>
        cy.get('.dropdown-menu li.car-select-dropdown_item:not(.disabled)', { timeout: 10000 }).first().click();

    }

    openAddExpenseModal() {
        // Клік на кнопку "Add an expense"
        cy.contains('button', 'Add an expense').click();
        
        // Переконатися, що модальне вікно відкрилося
        cy.get('app-add-expense-form').should('be.visible');
    }

    fillExpenseForm(expenseDetails) {
        // Введення пробігу
        cy.get('input[name="mileage"]').clear().type(expenseDetails.mileage).blur();

        // Введення кількості літрів
        cy.get('input[name="liters"]').clear().type(expenseDetails.liters);

        // Введення загальної суми витрат
        cy.get('input[name="totalCost"]').clear().type(expenseDetails.totalCost.toString());
    }

    submitExpense() {
        // Дочекатися, поки кнопка стане активною
        cy.get('.modal-footer .btn-primary').should('not.be.disabled').click();
        
        // Переконатися, що модальне вікно закрилося
        cy.get('app-add-expense-form').should('not.exist');
    }

    

}

export default FuelExpensePage;
