/// <reference types="cypress" />

describe('Deletar Dispositivos', () => {

    const bodyRequest = require('../fixtures/cadastrar_device_sucesso.json');

    it('Deletar um dispositivo', () => {

        cy.cadastrarDevice(bodyRequest)
            .then((response) => {
                expect(response.status).eq(200)
                cy.deletarDevice(response.body.id)
                    .then((deleteResponse) => {
                        expect(deleteResponse.status).eq(200)
                        cy.log(deleteResponse.body.message)
                        expect(deleteResponse.body.message).eq(`Object with id = ${response.body.id} has been deleted.`)
                    });
            });
    });

    it('Deletar um dispositivo não existente', () => {

        const idInexistente = '9977919';

        cy.deletarDeviceFail(idInexistente)
            .then((deleteResponse) => {
                expect(deleteResponse.status).eq(404)
                cy.log(deleteResponse.body.error)
                expect(deleteResponse.body.error).eq(`Object with id = ${idInexistente} doesn't exist.`)
            });
    });

    it('Deletar um dispositivo que não o permite deleção', () => {

        const idReservado = '7';

        cy.deletarDeviceFail(idReservado).then((deleteResponse) => {
            expect(deleteResponse.status).eq(405)
            cy.log(deleteResponse.body.error)
            expect(deleteResponse.body.error).eq(`${idReservado} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)
        });
    });
});