/// <reference types="cypress" />

describe('Buscar dispositivos', () => {
    
    it('Deve buscar a lista de dispositivos e validar o status code', () => {

        const device_id = '1';
        const device_name = 'Google Pixel 6 Pro';

        // requisição GET
        cy.request({
            method: 'GET',
            url: `/objects/${device_id}`,
            failOnStatusCode: false
        }).as('getDeviceResult');

        // validações
        cy.get('@getDeviceResult')
            .then((response) => {
                expect(response.status).eq(200);

                expect(response.body).not.empty;

                expect(response.body.id).eq(device_id);
                expect(response.body.name).eq(device_name);
                expect(response.body.data).not.empty;
            })
    });
});