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
        }).as('postDeviceResult');

        //pegando o result do cadastro
        //para pegar o id 
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).eq(200)

            cy.request({
                method: 'DELETE',
                url: `/objects/${response.body.id}`,
            }).as('deleteDeviceResult');

            //validações do delete
            cy.get('@deleteDeviceResult').then((deleteResponse) => {
                expect(deleteResponse.status).eq(200)
                cy.log(deleteResponse.body.message)
                expect(deleteResponse.body.message).eq(`Object with id = ${response.body.id} has been deleted.`)
            });
        });
    });

    it('Deletar um dispositivo não existente', () => {

        const idInexistente = '9977919';

        cy.request({
            method: 'DELETE',
            url: `/objects/${idInexistente}`,
            failOnStatusCode: false
        }).as('deleteDeviceResult');

        //validações do delete
        cy.get('@deleteDeviceResult').then((deleteResponse) => {
            expect(deleteResponse.status).eq(404)
            cy.log(deleteResponse.body.error)
            expect(deleteResponse.body.error).eq(`Object with id = ${idInexistente} doesn't exist.`)
        });
    });

    it('Deletar um dispositivo que nã o permite deleção', () => {

        const idReservado = '7';

        cy.request({
            method: 'DELETE',
            url: `/objects/${idReservado}`,
            failOnStatusCode: false
        }).as('deleteDeviceResult');

        //validações do delete
        cy.get('@deleteDeviceResult').then((deleteResponse) => {
            expect(deleteResponse.status).eq(405)
            cy.log(deleteResponse.body.error)
            expect(deleteResponse.body.error).eq(`${idReservado} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)
        });
    });
});