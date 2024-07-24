## Sistema de Registro de Pontos de uma Empresa

Este é um sistema desenvolvido em React com TypeScript para o frontend e Node.js para o backend. Os testes foram implementados utilizando JavaScript. O sistema é destinado ao registro de pontos de funcionários de uma empresa.
Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados no seu sistema:

    Node.js
    PostgreSQL

Criar Tabela de Funcionários:

    Você precisará criar uma tabela no banco de dados para armazenar os funcionários. Utilize o seguinte comando SQL como exemplo:

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL
);

Insira pelo menos um funcionário para testar a aplicação:

        INSERT INTO employees (name, department) VALUES ('Nome do Funcionário', 'Departamento');

Configuração do Projeto

    Clonar o Repositório:

        Clone este repositório para o seu ambiente local

Instalar Dependências:

    No diretório raiz do projeto, instale as dependências necessárias executando:

    npm install

Configurar Variáveis de Ambiente:

    Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

    DB_HOST=seu_host
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=nome_do_banco

    Substitua seu_host, seu_usuario, sua_senha e nome_do_banco pelas suas configurações do PostgreSQL.

Executar o Projeto:

    Para iniciar o servidor backend, execute:

    sql

node server.js


Funcionalidades

    Registro de Horas:
        Os funcionários podem registrar a data e hora de início e fim da jornada de trabalho.
        O sistema calcula automaticamente a quantidade de horas trabalhadas.

Exemplo de Uso

    Acesse a aplicação pelo navegador.
    Faça login utilizando as credenciais.
    Na página principal, preencha os campos de registro de ponto.
    Visualize as horas trabalhadas e os registros anteriores.
