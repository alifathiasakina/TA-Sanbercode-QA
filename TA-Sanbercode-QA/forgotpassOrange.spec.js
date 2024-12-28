import OrangePOM from './OrangePOM';

Cypress.on('uncaught:exception', (err, runnable) => {
    console.error(err);
    return false;
  });

describe('Validate Page Navigation and Accessibility', () => {
    const loginPOM = new OrangePOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify that the "Forgot your password?" link redirects to the Reset Password page', () => {
        loginPOM.elements.resetPassword().click();
        cy.url().should('include', 'requestPasswordResetCode');
        cy.url().should('include', 'requestPasswordResetCode');
    });

    it('Verify that the cancel button navigates back to the login page from the Reset Password page', () => {
        loginPOM.elements.resetPassword().click();
        cy.url().should('include', 'requestPasswordResetCode');
        cy.get('button.orangehrm-forgot-password-button--cancel').click();
        cy.url().should('include', 'auth/login');
    });
});

describe('Validate User Interface and Responsiveness', () => {
    const loginPOM = new OrangePOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify the presence and visibility of all elements', () => {
        loginPOM.elements.resetPassword().click();

        loginPOM.elements.resetPasswordTitle()
            .should('exist')
            .and('contain.text', 'Reset Password');

        loginPOM.elements.resetPasswordInstructions()
            .should('exist')
            .and('contain.text', 'Please enter your username to identify your account to reset your password');

        loginPOM.elements.usernameIcon()
            .should('exist');

        loginPOM.elements.usernameLabel()
            .should('exist')
            .and('contain.text', 'Username');

        loginPOM.elements.usernameInput()
            .should('exist')
            .and('have.attr', 'placeholder', 'Username');

        loginPOM.elements.cancelButton()
            .should('exist')
            .and('contain.text', 'Cancel');

        loginPOM.elements.resetButton()
            .should('exist')
            .and('contain.text', 'Reset Password');

        loginPOM.elements.copyrightText1()
            .should('exist');

        loginPOM.elements.copyrightText2()
            .should('exist');
    });

    it('Verify the alignment and consistency of UI elements on the Reset Password page', () => {
        loginPOM.elements.resetPassword().click();

        loginPOM.elements.resetPasswordTitle()
            .should('have.css', 'text-align', 'start');

        loginPOM.elements.resetPasswordInstructions()
            .should('have.css', 'text-align', 'start');

        loginPOM.elements.usernameIcon()
            .should('have.css', 'align-items', 'normal');

        loginPOM.elements.usernameLabel()
            .should('have.css', 'text-align', 'start');
        
        loginPOM.elements.usernameInput()
            .should('have.css', 'text-align', 'start');

        loginPOM.elements.cancelButton()
            .should('have.css', 'justify-content', 'normal');
        
        loginPOM.elements.resetButton()
            .should('have.css', 'justify-content', 'normal');

        loginPOM.elements.copyrightText1()
            .should('have.css', 'text-align', 'center');
       
        loginPOM.elements.copyrightText2()
            .should('have.css', 'text-align', 'center');
    });
});