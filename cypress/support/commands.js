// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
//   if (options && options.sensitive) {
//     // Вимикаємо стандартний лог Cypress
//     options.log = false;

//     // Створюємо власний лог з маскованим введенням
//     Cypress.log({
//       $el: element,
//       name: 'type',
//       message: '*'.repeat(text.length), // Замінюємо введені символи на зірочки
//     });
//   }

//   return originalFn(element, text, options);
// });

// Cypress.Commands.add('createExpense', (carId, expenseData) => {
//   cy.request({
//     method: 'POST',
//     url: 'https://qauto.forstudy.space/api/expenses', // URL для створення витрат
//     body: {
//       carId: carId,
//       reportedAt: expenseData.date, // Заміна поля `date` на `reportedAt`
//       liters: expenseData.liters, // Кількість літрів
//       mileage: expenseData.mileage, // Поточний пробіг
//       totalCost: expenseData.totalCost // Загальна вартість
//     },
//     headers: {
//       Cookie: `remember_me=${Cypress.env('rememberMeToken')}`, // Додаємо авторизаційний куки
//     },
//     withCredentials: true, // Використовуємо куки для автентифікації
//   }).then((response) => {
//     // Перевірка статусу
//     expect(response.status).to.be.oneOf([200, 201]); // Дозволяємо 200 або 201

//     // Перевірка наявності `data` в відповіді
//     expect(response.body).to.have.property('data'); 

//     const expense = response.body.data; // Отримуємо витрату з тіла відповіді

//     // Перевірка даних витрат
//     expect(expense).to.be.an('object');
//     expect(expense).to.have.property('id'); // Перевіряємо, що у відповіді є `id` витрати
//     expect(expense.carId).to.eq(carId); // Перевіряємо, що витрата пов'язана з правильним автомобілем
//     expect(expense.mileage).to.eq(expenseData.mileage); // Перевіряємо пробіг
//     expect(expense.totalCost).to.eq(expenseData.totalCost); // Перевіряємо загальну вартість
//     expect(expense.liters).to.eq(expenseData.liters); // Перевіряємо кількість літрів

//     return expense; // Повертаємо витрату для подальшого використання в тестах
//   });
// });
Cypress.Commands.add('createExpense', (carId, liters, mileage, totalCost, reportedAt) => {
  cy.request('POST', '/api/expenses', {
    carId,
    liters,
    mileage,
    totalCost,
    reportedAt
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body.data;
  });
});