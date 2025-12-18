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
            url: '/objects',
            body: bodyRequest,
            failOnStatusCode: false
        }).then((postResponse) => {
            const deviceId = postResponse.body.id
            cy.log('created id: ' + deviceId)

            if (!deviceId) {
                // If no id returned, fail the test with a helpful message
                throw new Error('POST response did not contain an id')
            };

            cy.request({
                method: 'DELETE',
                url: `/objects/${deviceId}`,
                failOnStatusCode: false
            }).then((deleteResponse) => {
                expect([200, 204]).to.include(deleteResponse.status)
            });
        });
    });
});