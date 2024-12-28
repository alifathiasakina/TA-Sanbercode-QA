import OrangePOM from './OrangePOM';

Cypress.on('uncaught:exception', (err, runnable) => {
    console.error(err);
    return false;
  });

describe('Validate Directory Page Navigation and Loading', () => {
    const loginPOM = new OrangePOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify directory page navigation', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.verifyDirectoryPage();
    });

    it('Verify directory page loads correctly', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.verifyApiResponse();
        loginPOM.verifyDirectoryPageElements();
    });
});

describe('Validate Search and Filtering Functionality', () => {
    const loginPOM = new OrangePOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify search functionality for existing employee', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.searchEmployeeByName('Peter');
        loginPOM.verifyEmployeeCard('Peter Mac Anderson');
    });

    it('Verify search functionality for non-existing employee', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        cy.get('input[data-v-75e744cd]')
            .type('John Doe');
        cy.get('button.oxd-button--secondary')
            .click();
        loginPOM.verifyInvalidMessage();
    });

    it('Verify filtering functionality for existing job title', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.filterByJobTitle('Chief Financial Officer');
        loginPOM.verifyJobTitle('Chief Financial Officer');
    });

    it('Verify filtering functionality for non-existing job title', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.filterByJobTitle('Support Specialist');
        loginPOM.verifyNoRecordsFound();
    });

    it('Verify filtering functionality for existing location', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.filterByLocation('New York Sales Office');
        loginPOM.verifyLocation('New York Sales Office');
    });

    it('Verify filtering functionality for non-existing location', () => {
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        loginPOM.filterByLocation('Canadian Regional HQ');
        loginPOM.verifyNoRecordsFound();
    });
});

describe.only('Validate Directory Page Usability and Interaction', () => {
    const loginPOM = new OrangePOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify employee details display on Directory Page', () => {
        cy.intercept('GET', '/web/index.php/api/v2/directory/employees?limit=14&offset=0', {
            statusCode: 200,
            body: {
                data: [
                    {
                        employeeName: 'Peter Mac Anderson',
                        jobTitle: 'Chief Financial Officer',
                        location: 'New York Sales Office',
                        profilePicture: 'profile-pic-url', // Example data for testing
                    }
                ]
            }
        }).as('getEmployees');
        loginPOM.loginOrange();
        loginPOM.navigateToDirectory();
        cy.wait('@getEmployees');
        loginPOM.verifyEmployeeCardDetails();
    });
});