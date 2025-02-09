describe('Login Form', () => { 
    beforeEach(() => {
      const username = 'guest';
      const password = 'welcome2qauto';
      const url = `https://${username}:${password}@qauto.forstudy.space/`;  

      cy.visit(url);

      // Чекаємо появи кнопки входу (переконаємося, що елемент дійсно існує)
      cy.get('button.btn.btn-outline-white.header_signin', { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          cy.log(`Found button text: "${text.trim()}"`);
        });

      // Перевіряємо, що кнопка містить потрібний текст (без зайвих пробілів)
      cy.get('button.btn.btn-outline-white.header_signin')
        .should('be.visible')
        .and(($btn) => {
          const text = $btn.text().trim();
          expect(text).to.match(/Sign In/i); // Регулярний вираз для врахування можливих варіацій тексту
        });
    });

    it('should open the login modal when clicking the Sign in button', () => {
      cy.get('button.btn.btn-outline-white.header_signin').click();
      cy.get('.modal-body').should('be.visible');
    });

    it('should show login form inside the modal', () => {
      cy.get('button.btn.btn-outline-white.header_signin').click();
      cy.get('.modal-body').should('be.visible');
      cy.get('#signinEmail').should('be.visible');
      cy.get('#signinPassword').should('be.visible');
    });

    it('should be able to login with correct credentials and land on garage page', () => {
      cy.get('button.btn.btn-outline-white.header_signin').click();
      cy.get('#signinEmail').type('test1@example.com');
      cy.get('#signinPassword').type('Test1234', { sensitive: true }); // Пароль маскується в логах
      cy.get('.modal-footer > .btn-primary').click();

      cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
      cy.get('.container', { timeout: 15000 }).should('be.visible');
    });

    it('should be able to close the login modal', () => {
      cy.get('button.btn.btn-outline-white.header_signin').click();
      cy.get('.modal-body').should('be.visible');
      cy.get('.close > span').click();
      cy.get('.modal-body').should('not.exist');
    });
});
