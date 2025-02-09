describe('Basic Auth Test with Registration Form - Full Validation', () => {
    beforeEach(() => {
        const username = 'guest';
        const password = 'welcome2qauto';
        const url = `https://${username}:${password}@qauto.forstudy.space/`;

        cy.visit(url);
        cy.get('header').should('be.visible');
        cy.get('.hero-descriptor_btn').click({ force: true });
        cy.wait(2000);
        cy.get('.modal-body').should('be.visible');
    });

    function checkRequiredField(selector, errorMessage) {
        cy.get(selector).click();
        cy.get('.modal-body').click();
        cy.get('.invalid-feedback').should('contain', errorMessage); // Перевірка повідомлення про помилку
        cy.get(selector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

    it('should validate required fields only after losing focus', () => {
        checkRequiredField('#signupName', 'Name required');
        checkRequiredField('#signupLastName', 'Last name required');
        checkRequiredField('#signupEmail', 'Email required');
        checkRequiredField('#signupPassword', 'Password required');
        checkRequiredField('#signupRepeatPassword', 'Re-enter password required');
    });

    it('should validate the Name field', () => {
    cy.get('#signupName').clear().type('1'); // Вводимо 1 символ

    // Імітація втрати фокусу для активації валідації
    cy.get('#signupName').blur();

    // Перевіряємо, що з'явився тултіп з класом "invalid-feedback"
    cy.get('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Name is invalid')
      .and('contain', 'Name has to be from 2 to 20 characters long');
    });

    //Перевіряємо, що відбудеться трім якщо юзер введе більше ніж 20 символів
    it('should show validation error for a name longer than 20 characters', () => {
        const longName = 'ThisNameIsWayTooLong'; // 21 символ
        cy.get('#signupName').clear().type(`   ${longName}   `).blur(); // Тестуємо trim()
    
        // Перевіряємо тултіп для 21+ символу
        cy.get('.invalid-feedback')
          .should('be.visible')
          .and('contain', 'Name is invalid')
          .and('contain', 'Name has to be from 2 to 20 characters long');
        });

    it('should allow a valid name (between 2 and 20 characters)', () => {
            const validName = 'John'; // 4 символа
            cy.get('#signupName').clear().type(`   ${validName}   `).blur(); // Тестуємо trim()
        
            // Переконуємося, що червоний бордер ВІДСУТНІЙ
            cy.get('#signupName')
              .should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
          });
    
        //Перевіряємо, що з'явився тултіп з класом "invalid-feedback" для Last Name
    it('should validate the Last Name field', () => {
        cy.get('#signupLastName').clear().type('1@!');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('contain', 'Last name is invalid');
    });

    //Перевіряємо, що відбудеться трім якщо юзер введе більше ніж 20 символів
    it('should show validation error for a name longer than 20 characters', () => {
        const longName = 'ThisNameIsWayTooLong2'; // 21 символ
        cy.get('#signupLastName').clear().type(`   ${longName}   `).blur(); // Тестуємо trim()
    
        // Перевіряємо тултіп для 21+ символу
        cy.get('.invalid-feedback')
          .should('be.visible')
          .and('contain', 'Last name is invalid')
          .and('contain', 'Last name has to be from 2 to 20 characters long');
        });

    it('should validate the Email field', () => {
        cy.get('#signupEmail').clear().type('invalid-email');
        cy.get('#signupEmail').blur();        
        cy.get('.invalid-feedback').should('contain', 'Email is incorrect');
    });

    it('should validate the Password field', () => {
        // Перевірка занадто короткого паролю
        cy.get('#signupPassword').clear().type('short');
        cy.get('#signupPassword').blur(); 
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        // Перевірка занадто довгого пароля
        cy.get('#signupPassword').clear().type('ThisIsAVeryLongPassword123');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        // Перевірка пароля без цифр
        cy.get('#signupPassword').clear().type('NoNumbersHere');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        // Перевірка пароля без великих літер
        cy.get('#signupPassword').clear().type('lowercase123');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        // Перевірка пароля без маленьких літер
        cy.get('#signupPassword').clear().type('UPPERCASE123');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    it('should validate the Re-enter Password field', () => {
        cy.get('#signupPassword').clear().type('Password1'); // Вводимо пароль
        cy.get('#signupRepeatPassword').clear().type('WrongPassword1').blur(); // Вводимо інший повторний пароль
    
        // Очікуємо появу тултіпа
        cy.get('.invalid-feedback')
          .should('be.visible') // Переконуємося, що він з'явився
          .and('contain.text', 'Passwords do not match'); // Переконуємося, що текст правильний
    
        // Переконуємося, що поле підсвічується червоним
        cy.get('#signupRepeatPassword')
          .should('have.css', 'border-color', 'rgb(220, 53, 69)'); // Червоний бордер
    });  

    it('should disable the Register button when data is incorrect', () => {
        cy.get('#signupName').clear();
        cy.get('#signupLastName').clear();
        cy.get('#signupEmail').clear();
        cy.get('#signupPassword').clear();
        cy.get('#signupRepeatPassword').clear();
        cy.get('.modal-footer > .btn').should('be.disabled');
    });

    it('should enable the Register button when all data is valid', () => {
        // Вводимо валідні дані у поля
        cy.get('#signupName').clear().type('ValidName'); // Валідне ім'я
        cy.get('#signupLastName').clear().type('ValidLastName'); // Валідне прізвище
        cy.get('#signupEmail').clear().type('validemail@example.com'); // Валідний email
        cy.get('#signupPassword').clear().type('Password1'); // Валідний пароль
        cy.get('#signupRepeatPassword').clear().type('Password1'); // Повторений валідний пароль
    
        // Перевірка, що кнопка реєстрації активна
        cy.get('.modal-footer > .btn').should('not.be.disabled');
      });
});
