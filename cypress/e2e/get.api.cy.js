/// <reference types="cypress" />

describe('Buscar dispositivos', () => {

    it('Deve buscar um dispositivos', () => {

        const deviceId = '1';
        const deviceName = 'Google Pixel 6 Pro';

        // requisição GET
        cy.buscarDeviceEspecifico(deviceId)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body).not.empty;
                expect(response.body.id).eq(deviceId);
                expect(response.body.name).eq(deviceName);
                expect(response.body.data).not.empty;
            });
    });

    it('Deve buscar um dispositivo que não existe', () => {

        const deviceId = '123ad22';

        // requisição GET
        cy.buscarDeviceEspecifico(deviceId)
            .then((response) => {
                expect(response.status).eq(404);
                expect(response.body.error).eq(`Oject with id=${deviceId} was not found.`);
            })
    });
});