/// <reference types="cypress" />

describe('Criar Dispositivos', () => {

    it('Cadastrar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 16);

        const payloadCadastroDevice = require('../fixtures/cadastrar_device_sucesso.json');

        cy.cadastrarDevice(payloadCadastroDevice)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.id).not.empty;
                expect(response.body.createdAt).not.empty;
                expect(response.body.createdAt.slice(0, 16)).eq(dataAtual);
                expect(response.body.name).eq(bodyRequest.name);
            })
    });
});