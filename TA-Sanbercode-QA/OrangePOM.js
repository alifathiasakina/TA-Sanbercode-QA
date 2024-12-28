class OrangePOM {
    elements = {
        visitPage: () => cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        usernameInput: () => cy.get('[name="username"]'),
        passwordInput: () => cy.get('[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content-text'),
        userRequired: () => cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > span')
        .should('contain.text', 'Required'),
        passRequired: () => cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > span')
        .should('contain.text', 'Required'),
        resetPassword: () => cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header'),
        dashboardHeader: () => cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module'),
        userDropdown: () => cy.get('.oxd-userdropdown-name'),
        logoutLink: () => cy.get('.oxd-userdropdown-link[href="/web/index.php/auth/logout"]'),
        loginTitle: () => cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title'),
        directoryMenu: () => cy.contains('.oxd-main-menu-item--name', 'Directory'),
        apiIntercept: () => cy.intercept('GET', '/web/index.php/api/v2/directory/employees?limit=14&offset=0').as('getEmployees'),
        directoryHeader: () => cy.get('.oxd-table-filter-header .oxd-table-filter-title'),
        employeeNameLabel: () => cy.get('label.oxd-label').contains('Employee Name'),
        employeeNameInput: () => cy.get('input[data-v-75e744cd]'),
        jobTitleLabel: () => cy.get('label.oxd-label').contains('Job Title'),
        jobTitleDropdown: () => cy.get('div.oxd-select-text').eq(0),
        locationLabel: () => cy.get('label.oxd-label').contains('Location'),
        locationDropdown: () => cy.get('div.oxd-select-text').eq(1),
        resetButton: () => cy.get('button.oxd-button--ghost').contains('Reset'),
        searchButton: () => cy.get('button.oxd-button--secondary').contains('Search'),
        recordsFound: () => cy.get('span.oxd-text.oxd-text--span'),
        employeeNameColumn: () => cy.get('p.oxd-text--p.orangehrm-directory-card-header.--break-words'),
        profilePictureColumn: () => cy.get('img.orangehrm-profile-picture-img'),
        jobTitleColumn: () => cy.get('p.orangehrm-directory-card-subtitle'),
        locationColumn: () => cy.get('p.orangehrm-directory-card-description'),
        questionMarkIcon: () => cy.get('i.bi-question-lg'),
        footerText: () => cy.get('p.orangehrm-copyright'),
    }
    typeonUsername(username){
        this.elements.usernameInput().type(username);
    }
    typeonPassword(password){
        this.elements.passwordInput().type(password);
    }
    clickOnLoginBtn(){
        this.elements.loginBtn().click();
    }
    clickOnResetPassword(){
        this.elements.resetPassword().click();
    }
    userLogout(){
        this.elements.dashboardHeader().should('contain.text', 'Dashboard');
        this.elements.userDropdown().click();
        this.elements.logoutLink().click();
    }
    verifyLoginPageTitle() {
        this.elements.loginTitle().should('have.text', 'Login');
    }
    loginOrange(){
        this.typeonUsername('Admin');
        this.typeonPassword('admin123');
        this.clickOnLoginBtn();
    }
    navigateToDirectory() {
        this.elements.directoryMenu().click();
    }
    verifyApiResponse() {
        this.elements.apiIntercept();
        cy.wait('@getEmployees').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            cy.log('API response verified:', interception.response.body);
            expect(interception.response.body).to.have.property('data');
        });
    }
    verifyDirectoryPage() {
        this.elements.directoryHeader()
            .should('exist')
            .and('contain.text', 'Directory');
    }
    verifyDirectoryPageElements() {
        this.elements.directoryHeader()
            .should('exist')
            .and('contain.text', 'Directory');

        // Verify Employee Name Field
        this.elements.employeeNameLabel().should('exist');
        this.elements.employeeNameInput()
            .should('exist')
            .and('have.attr', 'placeholder', 'Type for hints...');

        // Verify Job Title Field
        this.elements.jobTitleLabel().should('exist');
        this.elements.jobTitleDropdown().click().then(() => {
            cy.get('div.oxd-select-text--focus').should('have.length.greaterThan', 0);
        });

        // Verify Location Field
        this.elements.locationLabel().should('exist');
        this.elements.locationDropdown().click().then(() => {
            cy.get('div.oxd-select-text--focus').should('have.length.greaterThan', 0);
        });

        // Verify Reset and Search Buttons
        this.elements.resetButton().should('exist');
        this.elements.searchButton().should('exist');

        // Verify Records Found Text
        this.elements.recordsFound()
            .should('exist')
            .invoke('text')
            .then((text) => {
                const recordText = text.match(/\(\d+\) Records Found/);
                if (recordText) {
                    cy.wrap(recordText[0]).should('match', /\(\d+\) Records Found/);
                } else {
                    cy.log('Text does not match the expected pattern');
                }
            });

        // Verify Columns and Footer
        this.elements.employeeNameColumn().should('exist');
        this.elements.profilePictureColumn().should('exist');
        this.elements.jobTitleColumn().should('exist');
        this.elements.locationColumn().should('exist');
        this.elements.questionMarkIcon().should('exist');
        this.elements.footerText()
            .should('exist')
            .and('contain.text', 'OrangeHRM OS 5.7')
            .and('contain.text', '© 2005 - 2024')
            .find('a')
            .should('have.attr', 'href', 'http://www.orangehrm.com')
            .and('have.attr', 'target', '_blank');
    }
    searchEmployeeByName(employeeName) {
        cy.get('input[data-v-75e744cd]').type(employeeName);
        cy.get('div[role="option"].oxd-autocomplete-option')
            .contains(employeeName)
            .first()
            .click();
        cy.get('button.oxd-button--secondary').click();
    }
    filterByJobTitle(jobTitle) {
        cy.get('div.oxd-select-text')
            .eq(0)
            .click();
        cy.get('span[data-v-13cf171c]')
            .contains(jobTitle)
            .click();
        cy.get('button.oxd-button--secondary').click();
    }
    filterByLocation(location) {
        cy.get('div.oxd-select-text')
            .eq(1)
            .click();
        cy.get('span[data-v-13cf171c]')
            .contains(location)
            .click();
        cy.get('button.oxd-button--secondary').click();
    }
    verifyEmployeeCard(employeeName) {
        cy.get('p.oxd-text--p.orangehrm-directory-card-header.--break-words')
            .should('exist')
            .and('contain.text', employeeName);
    }
    verifyNoRecordsFound() {
        cy.get('span.oxd-text.oxd-text--span')
            .contains('No Records Found')
            .should('exist');
    }
    verifyInvalidMessage() {
        cy.get('span.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
            .should('exist')
            .and('contain.text', 'Invalid');
    }
    verifyJobTitle(jobTitle) {
        cy.get('p.orangehrm-directory-card-subtitle').should('contain.text', jobTitle);
    }
    verifyLocation(location) {
        cy.get('p.orangehrm-directory-card-description').should('contain.text', location);
    }
    verifyEmployeeCardDetails() {
        cy.get('p.oxd-text--p.orangehrm-directory-card-header.--break-words')
            .should('exist');
        cy.get('img.orangehrm-profile-picture-img')
            .should('exist');
        cy.get('p.orangehrm-directory-card-subtitle')
            .should('exist');
        cy.get('i.orangehrm-directory-card-icon')
            .should('exist');
        cy.get('p.orangehrm-directory-card-description')
            .should('exist');
    }
}

export default OrangePOM;