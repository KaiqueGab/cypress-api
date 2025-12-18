/// <reference types="cypress" />

describe('Deletar Dispositivos', () => {

    it('Deletar um dispositivo', () => {

        const bodyRequest = {
            "name": "Wireless Headphones",
            "data": {
                "Color": "Red",
                "Description": "High-performance wireless noise cancelling headphones"
            }
        };

        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: bodyRequest,
            failOnStatusCode: false
        }).as('postDeviceResult');

        //pegando o result do cadastro
        //para pegar o id 
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).eq(200)

            cy.request({
                method: 'DELETE',
                url: `https://api.restful-api.dev/objects/${response.body.id}`,
            }).as('deleteDeviceResult');

            //validações do delete
            cy.get('@deleteDeviceResult').then((deleteResponse) => {
                expect(deleteResponse.status).eq(200)
                cy.log(deleteResponse.body.message)
                expect(deleteResponse.body.message).eq(`Object with id = ${response.body.id} has been deleted.`)
            });
        });
    });
});