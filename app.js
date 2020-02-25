const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('web');
const morgan = require('morgan');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const port = 4000;

app.use(morgan(chalk.blue.bold('morgan ') + chalk.yellow(':method :url :status :res[content-length] - :response-time ms')));
app.use(express.static(`${__dirname}/public/`));
app.set('views', 'src/views/');
app.set('view engine', 'ejs');

var token = crypto.randomBytes(64).toString('hex');
if (!fs.existsSync("token.txt")) {
  fs.writeFile("token.txt", token, () => {});
} else {
  token = fs.readFileSync("token.txt").toString();
}

const config = require('./config.json')
const router = require('./routes');
router.route(app, token, config);

app.listen(port, () => {
  debug(chalk.green(`listening on port ${port}`));
});