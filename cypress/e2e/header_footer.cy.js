describe('Basic Auth Test with URL Embedding, Header Button Tests, and Footer Social Links', () => {
    beforeEach(() => {
      const username = 'guest';
      const password = 'welcome2qauto';
      const url = `https://${username}:${password}@qauto.forstudy.space/`;
  
      cy.visit(url);
  
      // Wait for the header to appear (ensures page has loaded)
      cy.get('header', { timeout: 15000 }).should('be.visible');
    });
  
    // Header Button Tests
    it('should find the active header link', () => {
      cy.get('a.btn.header-link.-active', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the first header button', () => {
      cy.get('button.btn.header-link', { timeout: 15000 })
        .first()
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the second header button', () => {
      cy.get('button.btn.header-link', { timeout: 15000 })
        .eq(1)
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the Guest log in button', () => {
      cy.get('button.header-link.-guest', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the Sign In button', () => {
      cy.get('button.btn.btn-outline-white.header_signin', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    // Footer Social Links Test
    it('should find the Facebook link', () => {
      cy.get('[href="https://www.facebook.com/Hillel.IT.School"] > .socials_icon', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the Telegram link', () => {
      cy.get('[href="https://t.me/ithillel_kyiv"] > .socials_icon', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the YouTube link', () => {
      cy.get('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"] > .socials_icon', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the Instagram link', () => {
      cy.get('[href="https://www.instagram.com/hillel_itschool/"] > .socials_icon', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  
    it('should find the LinkedIn link', () => {
      cy.get('[href="https://www.linkedin.com/school/ithillel/"] > .socials_icon', { timeout: 15000 })
        .should('be.visible')
        .should('not.have.css', 'display', 'none');
    });
  });
  