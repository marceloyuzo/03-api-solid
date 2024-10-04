# App

GymPass style app.

## Requisitos Funcionais
[x] Deve ser possível realizar um cadastro;
[x] Deve ser possível se autenticar;
[x] Deve ser possível obter o perfil de um usuário logado;
[x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
[x] Deve ser possível o usuário obter o histórico de check-ins;
[x] Deve ser possível o usuário buscar academias próximas (até 10km);
[x] Deve ser possível o usuário buscar academias pelo nome;
[x] Deve ser possível o usuário realizar check-ins em uma academia;
[x] Deve ser possível validar o check-in de um usuário;
[x] Deve ser possível cadastrar uma academia;
 
## Regras de Negocios
[x] O usuário não deve poder se cadastrar com um e-mail duplicado;
[x] O usuário não pode fazer 2 check-ins no mesmo dia;
[x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
[x] O check-in só pode ser validado até 20 minutos após criado;
[x] O check-in só pode ser validado por admnistradores;
[x] A academia só pode ser cadastrada por admnistradores;

## Requisitos Não-Funcionais
[x] A senha do usuário precisa estar criptografada;
[x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
[x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
[x] O usuário deve ser identificado por um JWT (JSON WEB TOKEN);
