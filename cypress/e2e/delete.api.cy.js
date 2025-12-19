/// <reference types="cypress" />

describe('Deletar Dispositivos', () => {

    const bodyRequest = require('../fixtures/cadastrar_device_sucesso.json');

    it('Deletar um dispositivo', () => {

        cy.cadastrarDevice(bodyRequest)
            .then((postResponse) => {
                const deviceId = postResponse.body.id
                cy.log('created id: ' + deviceId)

                if (!deviceId) {
                    // If no id returned, fail the test with a helpful message
                    throw new Error('POST response did not contain an id')
                };

                cy.deletarDevice(postResponse.body.id)
                    .then((deleteResponse) => {
                        expect([200, 204]).to.include(deleteResponse.status)
                    });
            });
    });
});