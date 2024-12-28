# Cypress Test Suite for OrangeHRM - Login, Reset Password, and Directory Page

## Project Overview

This repository contains a set of Cypress tests for validating core functionalities of the **OrangeHRM** application, specifically focusing on the **Login**, **Password Reset**, and the **Directory Page** flow.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/alifathiasakina/TA-Sanbercode-QA.git

2. Navigate to the project directory
:
    ```bash
    cd cypress/e2e/orangeHRM/TA-Sanbercode-QA/
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Running the Tests

To execute the test suite, run the following command:
    ```bash
    npx cypress open
    ```

This will open the Cypress Test Runner, where you can select and run individual test files.

## Key Files Summary

1. OrangePOM.js: Contains the Page Object Model for the OrangeHRM application. This file includes methods for interacting with the login page, password reset page, and directory page.

2. loginOrange.spec.js: Contains tests for the login functionality. This file verifies that users can log in with valid credentials and checks the behavior with invalid credentials.

3. forgotpassOrange.spec.js: Contains tests for the password reset functionality. This file ensures that users can access the password reset page and complete the password reset process.

4. dashboardOrange.spec.js: Contains tests for the directory page. This file includes tests for navigating to the directory page, performing searches, and applying filters.