# 🧠 PROJETO INTEGRADOR: ANÁLISE DE SOLUÇÕES INTEGRADAS PARA ORGANIZAÇÕES

•	Nosso produto consiste em um sistema para gestão de petshop, nomeado como Cantinho do Pet, priorizamos por escolher tecnologias atuais e que se enquadra nas habilidades dos participantes.

•	No Backend  utilizamos Node.js + Express + Sequelize + MySQL + Jose (para JWT) + Dotenv + Cookie-parser. Que são componentes responsáveis pela conexão, autenticação e comunicação com o Frontend e o APP. 

•	No Frontend utilizamos tecnologias básicas sendo elas: HTML, CSS e JavaScript. A comunicação é realizada por meio de rotas HTTP, onde é realizado requisições e a API realiza a resposta através de dados JSON para o Frontend.

---
## 🖥️ Participantes

- DANIEL DE OLIVEIRA LOPES
- DANIEL DE OLIVEIRA SOLANO LOPES
- EDUARDO AUGUSTO DA SILVA ROSA
- HENRIQUE BARREIRO SANTANA
- MARCELLY CERDEIRINHA MARCIOTO
- MIRIAM VIEGAS DE JESUS
- VINICIUS PEREIRA DE SOUZA

OBS: O trabalho foi desenvolvido buscando aproveitar da melhor forma, o tempo e as habilidades de cada integrante, já que cada um possui uma rotina diferente. Por isso, dividimos as tarefas em três áreas: front-end, back-end e banco de dados. No início, cada parte do projeto foi hospedada separadamente no GitHub. A equipe ficou organizada com 3 pessoas no front-end, 3 no back-end e 1 responsável pelo banco de dados. No fim do desenvolvimento, juntamos tudo em um novo repositório para manter o projeto organizado. Por conta dessa migração, alguns integrantes não apareceram com commits na versão final, já que parte do trabalho deles ficou registrada nos repositórios anteriores. Mesmo assim, todos participaram ativamente e contribuíram para a entrega do material final.

---

## ⚙️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize (ORM)](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [jose](https://www.npmjs.com/package/jose) (para JWT)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [nodemon](https://www.npmjs.com/package/nodemon)

---

## 📦 Estrutura do projeto
BACKEND:
``` 
src/
├── config/
│ └── database.js # Conexão com o banco via Sequelize
│
├── controllers/ # Lógica das rotas
│
├── lib/ # Contém uma função para preenchimento inicial com dados ficticios e controle de cookies
│
├── middleware/ # Gerencia e faz controle dos usuários para acessar dados e rotas
│
├── models/ # Modelos das tabelas do banco
│ 
├── routes/ # Rotas da API
│ └── index.js
│
├── utils/ # Funções soltas para serem reaproveitadas em diversos arquivos
│
├── app.js # Configuração do Express
└── server.js # Inicialização do servidor
```
FRONTEND:
```
├── assets/
│ └── css/ # Arquivos para estilização do sistema
│ └── img/ # Imagens usadas
│ └── js/ # Parte lógica e conexão com a API
│
├── agendamentos/ # Arquivos HTML das telas de agendamentos, possui painel de horários marcados e painel de andamento do pedido
|
├── cadastro_cliente/ # Arquivos HTML das telas de cliente, possui painel de visualização e cadastro de clientes
|
├── estoque/ # Arquivos HTML das telas de estoque dos produtos, possui painel de visualização dos produtos e ação de inluir estoque do produto
│
├── produtos/ # Arquivos HTML das telas de produto, possui painel de visualização dos produtos, cadastro de produtos, cadastro de setor e grupos
│
├── vendas/ # Gerencia e faz controle dos usuários para acessar dados e rotas
│
├── header.html # Painel utilizado no cabeçalho das telas
│ 
├── index.html # Arquivo índice do frontend, a nossa tela de login
│
└── telainicial.html # Tela inicial que o usuário é redirecionado após efetuar o login
```

---

## 🧩 Pré-requisitos

- Node.js (v18+)
- MySQL (pode ser local via **XAMPP**, **MySQL Workbench** ou **Docker**)

---

## 🗄️ Banco de Dados

### 🧱 1. Criar o banco

No **MySQL Workbench**, execute o comando SQL abaixo:

```sql
CREATE DATABASE cantinho_pet;
```

### 📤 2. Importar o arquivo .sql

- Abra o MySQL Workbench
- Vá em Server > Data Import
- Selecione Import from Self-Contained File
- Escolha o arquivo cantinho_pet_oficial.sql (presente no repositório)
- Em Default Target Schema, selecione ou crie cantinho_pet
- Clique em Start Import

Esse arquivo contém as tabelas iniciais necessárias, como usuarios, produtos, agendamentos, estoque e etc.

---

## ⚙️ Variáveis de ambiente

Crie um arquivo .env na raiz do projeto com base no modelo abaixo:

```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
PORT=
SESSION_SECRET=
JWT_SECRET=
```

⚠️ Se você usa o XAMPP, provavelmente o usuário é root e a senha fica vazia.
⚙️ Se você usa Docker, ajuste conforme o docker-compose.yml.

---

## 🐳 Rodando com Docker (opcional)

Se preferir usar Docker, basta ter o Docker e Docker Compose instalados.

1. Suba o container MySQL:

```
docker compose up -d
```

2. O banco cantinho_pet será criado automaticamente.
3. Configure o .env com as mesmas credenciais do docker-compose.yml.

---

## 🚀 Rodando o servidor

1. Instale as dependências dentro do diretorio /backend:

```
npm install
```

2. Inicie o servidor em modo desenvolvimento:

```
npm run dev
```

3. Acesse no navegador (lembrando de usar o valor definido para a porta no .env, caso não tenha feito alteração o valor padrão é 3000):
   http://localhost:3000/api

Se aparecer:

```
{ "message": "API funcionando!" }
```
A api está funcionando!
---

## 🧾 Licença

Este projeto é apenas para fins acadêmicos (trabalho de faculdade).
Todos os direitos reservados ao grupo do projeto.
