/// <reference types="cypress" />

describe('Atualizar um dispositivos', () => {
    it('Atualizar um dispositivo', () => {

        const postBodyRequest = {
            "name": "Beats Studio3 Kaique",
            "createdAt": "2025-12-04T11:53:38.004+00:00",
            "data": {
                "Color": "Black",
                "Description": "High-performance wireless noise cancelling headphones"
            }
        };

        const putBodyRequest = {
            "name": "Beats Testes Fone - UPDATED PUT",
            "createdAt": "2025-12-04T11:53:38.004+00:00",
            "data": {
                "Color": "Black",
                "Description": "High-performance wireless noise cancelling headphones"
            }
        };


        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: postBodyRequest,
            failOnStatusCode: false
        }).as('postDeviceResult');

        //pegando o result do cadastro
        //para pegar o id 
        cy.get('@postDeviceResult').then((postResponse) => {
            expect(postResponse.status).eq(200)
            expect(postResponse.body.name).eq(postBodyRequest.name)

            cy.request({
                method: 'PUT',
                url: `https://api.restful-api.dev/objects/${postResponse.body.id}`,
                body: putBodyRequest,
                failOnStatusCode: false
            }).as('putDeviceResult');

            //validações do put
            cy.get('@putDeviceResult').then((putResponse) => {
                expect(putResponse.status).eq(200)
                expect(putResponse.body.name).eq(putBodyRequest.name)
            });
        });



    });
});