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
Cypress.Commands.add('buscarDeviceEspecifico', (deviceId) => {
    cy.request({
        method: 'GET',
        url: `/objects/${deviceId}`,
        failOnStatusCode: false
    }).then((response) => { return response });
});

Cypress.Commands.add('cadastrarDevice', (bodyRequest) => {
    cy.request({
        method: 'POST',
        url: '/objects',
        body: bodyRequest,
        failOnStatusCode: false
    }).then((response) => { return response });
});

Cypress.Commands.add('atualizarDevice', (responseId, putBodyRequest) => {
    cy.request({
        method: 'PUT',
        url: `/objects/${responseId}`,
        body: putBodyRequest,
        failOnStatusCode: false
    }).then((response) => { return response });
});

Cypress.Commands.add('deletarDevice', (idResponse) => {
    cy.request({
        method: 'DELETE',
        url: `/objects/${idResponse}`,
    }).then((response) => { return response })
});

Cypress.Commands.add('deletarDeviceFail', (id) => {
    cy.request({
        method: 'DELETE',
        url: `/objects/${id}`,
        failOnStatusCode: false
    }).then((response) => { return response })
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//, (email, password)
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })