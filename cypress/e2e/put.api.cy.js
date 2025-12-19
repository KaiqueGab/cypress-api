/// <reference types="cypress" />

const { get } = require("lodash");

describe('Atualizar um dispositivos', () => {

    const postBodyRequest = require('../fixtures/cadastrar_device_sucesso.json');

    const putBodyRequest = require('../fixtures/atualizar_device_sucesso.json');

    it('Atualizar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 16);

        //pegando o result do cadastro
        //para pegar o id 
        cy.cadastrarDevice(postBodyRequest)
            .then((postResponse) => {
                expect(postResponse.status).eq(200)
                expect(postResponse.body.name).eq(postBodyRequest.name)
                expect(postResponse.body.data.owner).eq(postBodyRequest.data.owner)

                //validações do put
                cy.atualizarDevice(postResponse.body.id, putBodyRequest)
                    .then((putResponse) => {
                        expect(putResponse.status).eq(200)
                        expect(putResponse.body.name).eq(putBodyRequest.name)
                        expect(putResponse.body.data.owner).eq(putBodyRequest.data.owner)
                        expect(putResponse.body.updatedAt.slice(0, 16)).eq(dataAtual)
                    });

                //validações do get após o put
                cy.buscarDeviceEspecifico(postResponse.body.id)
                    .then((getAfterPutResponse) => {
                        expect(getAfterPutResponse.status).eq(200)
                        expect(getAfterPutResponse.body.name).eq(putBodyRequest.name)
                        expect(getAfterPutResponse.body.data.owner).eq(putBodyRequest.data.owner)
                    });
            });
    });
});