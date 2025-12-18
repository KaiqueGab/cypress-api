/// <reference types="cypress" />

const { get } = require("lodash");

describe('Atualizar um dispositivos', () => {
    it('Atualizar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0,16);

        const postBodyRequest = {
            "name": "Beats Studio3 - CREATED POST",
            "createdAt": "2025-12-04T11:53:38.004+00:00",
            "data": {
                "Color": "Black",
                "Description": "High-performance wireless noise cancelling headphones",
                "owner": "Kaique"
            }
        };

        const putBodyRequest = {
            "name": "Beats Testes Fone - UPDATED PUT",
            "createdAt": "2025-12-04T11:53:38.004+00:00",
            "data": {
                "Color": "Black",
                "Description": "High-performance wireless noise cancelling headphones",
                "owner": "PUT Testes"
            }
        };

        cy.request({
            method: 'POST',
            url: '/objects',
            body: postBodyRequest,
            failOnStatusCode: false
        }).as('postDeviceResult');

        //pegando o result do cadastro
        //para pegar o id 
        cy.get('@postDeviceResult').then((postResponse) => {
            expect(postResponse.status).eq(200)
            expect(postResponse.body.name).eq(postBodyRequest.name)
            expect(postResponse.body.data.owner).eq(postBodyRequest.data.owner)
            cy.log(postResponse.body)

            cy.request({
                method: 'PUT',
                url: `/objects/${postResponse.body.id}`,
                body: putBodyRequest,
                failOnStatusCode: false
            }).as('putDeviceResult');

            //validações do put
            cy.get('@putDeviceResult').then((putResponse) => {
                expect(putResponse.status).eq(200)
                expect(putResponse.body.name).eq(putBodyRequest.name)
                expect(putResponse.body.data.owner).eq(putBodyRequest.data.owner)
                expect(putResponse.body.updatedAt.slice(0,16)).eq(dataAtual)
                cy.log(putResponse.body)
            });

            cy.request({
                method: 'GET',
                url: `/objects/${postResponse.body.id}`,
                failOnStatusCode: false
            }).as('getAfterPutDeviceResult');

            //validações do get após o put
            cy.get('@getAfterPutDeviceResult').then((getAfterPutResponse) => {
                expect(getAfterPutResponse.status).eq(200)
                expect(getAfterPutResponse.body.name).eq(putBodyRequest.name)
                expect(getAfterPutResponse.body.data.owner).eq(putBodyRequest.data.owner)
                cy.log(getAfterPutResponse.body)
            });
        });
    });
});