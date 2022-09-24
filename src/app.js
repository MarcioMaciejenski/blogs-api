const express = require('express');
const userRouters = require('./routers/user.router');
const categoriesRouters = require('./routers/categories.router');
const loginController = require('./controllers/login.controller');
const { validateLoginData } = require('./middlewares/validateLoginData');
// ...

const app = express();

app.use(express.json());
app.post('/login', validateLoginData, loginController.checkDataLogin);
app.use('/user', userRouters);
app.use('/categories', categoriesRouters);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
