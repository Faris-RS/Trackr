describe('Basic Homepage testing', () => {
  it('Visits the home page', () => {
    cy.visit('/user/home');
  });

  it('clicks the button "login"', () => {
    cy.visit('/user/home');
    cy.contains('Login').click();
    cy.url().should('include', '/user/login');
    cy.contains('Login').click();
    cy.contains('Please provide both email and password');
  });

  it('visits signup page', () => {
    cy.visit('/user/login');
    cy.contains('Register with us').click();
    cy.contains('Register').click();
    cy.contains('Please fill every field');
  });

  it('visits search page', () => {
    cy.visit('/user/search');
    cy.get('#search').type('kawass');
    cy.get('#search').clear();
    cy.get('#search').type('k');
    cy.get('#price').select('₹500 to ₹600').should('have.value', '2');
    cy.get('#price').select('₹600 to ₹700').should('have.value', '3');
    cy.get('#price').select('₹700 to ₹800').should('have.value', '4');
    cy.get('#price').select('More than ₹800').should('have.value', '5');
    cy.get('#price').select('Less than ₹500').should('have.value', '1');
  });
});

describe('Authentication testing', () => {
  beforeEach(() => {
    cy.visit('/user/login');
  });

  it('should try to login with incorrect credentials', () => {
    const email = 'test@example.com';
    const password = '123';

    cy.get('form').should('exist');
    cy.get('.custom-input[name="email"]').should('exist').type(email);
    cy.get('.custom-input[name="password"]').should('exist').type(password);
    cy.get('button[type="submit"]').should('exist').click();
    cy.contains('No user found with the provided email.');
  });

  it('should try to check for incorrect password', () => {
    const email = 'faris@gmail.com';
    const password = '12345678';

    cy.get('form').should('exist');
    cy.get('.custom-input[name="email"]').should('exist').type(email);
    cy.get('.custom-input[name="password"]').should('exist').type(password);
    cy.get('button[type="submit"]').should('exist').click();
    cy.contains('Incorrect password. Please try again.');
  });

  it('should try to login with a mock credential', () => {
    const email = 'test@gmail.com';
    const password = '123';

    cy.get('form').should('exist');
    cy.get('.custom-input[name="email"]').should('exist').type(email);
    cy.get('.custom-input[name="password"]').should('exist').type(password);
    cy.get('button[type="submit"]').should('exist').click();
  });
});

describe('Checking user routes', () => {
  beforeEach(() => {
    cy.visit('/user/login');
    const email = 'test@gmail.com';
    const password = '123';

    cy.get('form').should('exist');
    cy.get('.custom-input[name="email"]').should('exist').type(email);
    cy.get('.custom-input[name="password"]').should('exist').type(password);
    cy.get('button[type="submit"]').should('exist').click();
  });

  it('should check if user has been logged', () => {
    cy.contains('Logout');
    cy.wait(1000);
    cy.window().then((window) => {
      const token = window.localStorage.getItem('userToken');
      expect(token).to.not.be.null;
    });
  });

  it('should check userProfile', () => {
    cy.visit('/user/profile');
  });

  it('should test logout', () => {
    cy.contains('Logout').click();
    cy.wait(1000);
    cy.window().then((window) => {
      const token = window.localStorage.getItem('userToken');
      expect(token).to.be.null;
    });
  });
});

// describe('Cypress Basic Test', () => {
//   it('Visits Google', () => {
//     cy.visit('https://www.google.com');
//     cy.get('input[type="text"]').type('Cypress testing{enter}');
//     cy.url().should('include', 'search?q=Cypress+testing');
//   });
// });
