describe('Простий тест', () => {
    it('Відкриває сайт і перевіряє заголовок', () => {
      cy.visit('https://google.com'); // Замініть на свій сайт
      //cy.title().should('include', 'Example Domain'); // Перевіряємо, що заголовок містить "Example Domain"
    });
  });
  
  