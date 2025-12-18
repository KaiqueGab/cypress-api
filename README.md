# Projeto Cypress API

Este projeto utiliza o Cypress para realizar testes de API. O objetivo é garantir que as operações de CRUD (Create, Read, Update, Delete) funcionem corretamente em uma API RESTful.

## Estrutura do Projeto

```
.
├── cypress.config.js
├── package.json
├── cypress/
│   ├── e2e/
│   │   ├── delete.api.cy.js
│   │   ├── get.api.cy.js
│   │   ├── post.api.cy.js
│   │   └── put.api.cy.js
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
└── README.md
```

## Pré-requisitos

- Node.js instalado
- Cypress instalado (pode ser feito via `npm install cypress`)

## Como Executar os Testes

Execute o Cypress:
   ```bash
   npx cypress open
   ```
ou para rodar os testes em modo headless:
   ```bash
   npx cypress run
   ```

## Testes Implementados

- **POST**: Criação de um dispositivo
- **DELETE**: Exclusão de um dispositivo
- **PUT**: Atualizar dados de um dispositivo
- **GET**: Procurar um dispositivo
