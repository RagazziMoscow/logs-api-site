var express = require('express');
var app = express();


const port = process.env.PORT || 8000;
const chalk = require('chalk');


var middleware = require('./middleware')(app, express);
var routes = require('./routes')(app);


app.listen(port, () => {
  console.log(chalk.yellow(`Сервер работает на порту ${port}...`));
});