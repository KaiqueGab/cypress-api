/// <reference types="cypress" />

describe('Criar Dispositivos', () => {

    it('Cadastrar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0,16);

        const bodyRequest = {
            "name": "Wireless Headphones",
            "data": {
                "Color": "Red",
                "Description": "High-performance wireless noise cancelling headphones"
            }
        };

        cy.request({
            method: 'POST',
            url: '/objects',
            body: bodyRequest,
            failOnStatusCode: false
        }).as('postDeviceResult');

        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).eq(200);

            expect(response.body.id).not.empty;
            expect(response.body.createdAt).not.empty;
            expect(response.body.createdAt.slice(0,16)).eq(dataAtual);
            expect(response.body.name).eq(bodyRequest.name);

            console.log(response.body)

        })
    });
});