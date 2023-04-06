# Projeto Blogs Api
Desenvolvido no módulo de back-end do curso da <a href="https://www.betrybe.com/" target="_blank">Trybe</a>.

# Sobre o Projeto
Desenvolvi uma API e um banco de dados para a produção de conteúdo para um blog, baseado no **Diagrama ER e Entidades** criado pela Trybe.

# Tecnologia utilizadas
<li>Sequelize</li>
<li>JavaScript</li>

# Rodar o projeto localmente
1. Clone o repositório<br>
```git clone git@github.com:MarcioMaciejenski/blogs-api.git```
2. Para rodar com Docker.<br>
a. Verificar se a versão do docker-compose esta na versão 1.29 ou superior.<br>
b. Rode o comando ```docker-compose up -d --build``` .<br>
Serão inicializados dois containers chamados blogs_api e blogs_api_db.<br>
c. Use o comando:<br>
```docker exec -it blogs_api bash``` .<br>
d. Instale as dependências:<br>
```npm install``` .<br>
3. Para rodar sem Docker.<br>
a. Para rodar o projeto desta forma, obrigatoriamente você deve ter o ```node versão 16``` instalado em seu computador.<br>
b. Execute o comando: ```npm install```<br>
<hr>
Desenvolvido por <a href="https://www.linkedin.com/in/marcio-maciejenski/" target="_blank">Márcio Maciejenski</a>
