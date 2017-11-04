var engine = require('ejs-locals');
var bodyParser = require('body-parser');
const path = require('path');


module.exports = function(app, express) {
  app.engine('ejs', engine);
  app.set('views', path.join(__dirname, './../views'));
  app.set('view engine', 'ejs'); // so you can render('index')


  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, './../public')));
}